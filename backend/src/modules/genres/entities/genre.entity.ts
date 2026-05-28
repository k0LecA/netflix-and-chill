import { Entity,PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @OneToMany(() => Movie, (movie) => movie.genre)
    movies!: Movie[];
}