import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    description!: string;
}