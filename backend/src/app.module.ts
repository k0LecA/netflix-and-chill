import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './modules/movies/movies.module';
import { Movie } from './modules/movies/entities/movie.entity';
import { GenresModule } from './modules/genres/genres.module';
import { Genre } from './modules/genres/entities/genre.entity';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/auth/entities/user.entity';
import { AuthGuard } from './modules/auth/guards/auth.guard';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [Movie, Genre, User],
      synchronize: true,
    }),
    GenresModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
