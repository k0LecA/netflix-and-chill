import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateMovieDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    description?: string;
}