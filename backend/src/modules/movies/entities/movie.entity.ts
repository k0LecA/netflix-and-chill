import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    description!: string;
    @Column()
    year!: number;
    @Column()
    rating!: number;
    @Column()
    posterUrl!: string;
    @ManyToOne(()=>Genre, (genre)=>genre.movies)
    genre!: Genre;
    @Column()
    duration!: number;
}
