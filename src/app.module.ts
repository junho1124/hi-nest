import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
