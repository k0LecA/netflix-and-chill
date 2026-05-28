import { IsString, IsNotEmpty, MinLength, IsOptional, IsInt, Min, Max, IsNumber, IsUrl } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    description?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1888)
    @Max(2100)
    year!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;

    @IsNotEmpty()
    @IsUrl()
    posterUrl!: string;

    @IsNotEmpty()
    @IsInt()
    genreId!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    duration!: number;
}