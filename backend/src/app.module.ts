import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './modules/movies/movies.module';
import { Movie } from './modules/movies/entities/movie.entity'
import { GenresModule } from './modules/genres/genres.module';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Movie],
      synchronize: true,
    }),
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
