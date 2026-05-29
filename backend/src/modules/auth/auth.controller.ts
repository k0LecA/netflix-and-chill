import { Controller, Post, Get, Body, Req, Res, UnauthorizedException } from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

class SignUpDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsOptional()
  @IsString()
  name?: string;
}

class SignInDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const user = await this.authService.signUp(dto.email, dto.password, dto.name);
    const token = this.authService.generateToken(user.id, user.email);
    
    response.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return user;
  }

  @Post('signin')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    const user = await this.authService.signIn(dto.email, dto.password);
    const token = this.authService.generateToken(user.id, user.email);

    response.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return user;
  }

  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: express.Response) {
    response.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { success: true };
  }

  @Get('me')
  async me(@Req() request: express.Request) {
    const token = request.cookies?.['auth_token'];
    if (!token) {
      throw new UnauthorizedException('No authentication token found');
    }

    const decoded = this.authService.verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }

    return this.authService.getUserById(decoded.id);
  }
}
