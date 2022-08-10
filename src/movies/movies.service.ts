import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { throws } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie) {
            console.log(`id ${id}에 해당하는 영화가 없습니다.`)
            throw new NotFoundException(`id ${id}에 해당하는 영화가 없습니다.`);
        }
        return movie;
        // return this.movies.find(movie => movie.id === parseInt(id));
    }

    deleteOne(id:number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id)
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id:number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData})
    }
}
