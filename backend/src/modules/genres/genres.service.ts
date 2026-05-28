import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}
  create(createGenreDto: CreateGenreDto) {
    const genre = this.genresRepository.create(createGenreDto);
    return this.genresRepository.save(genre);
  }

  async findAll(): Promise<Genre[]> {
    return this.genresRepository.find();
  }

  async findOne(id: number) {
    const genre = await this.genresRepository.findOneBy({id});
    if(!genre) {
      throw new NotFoundException(`Genre #${id} not found`);
    }
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
