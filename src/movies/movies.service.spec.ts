import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { title } from 'process';
import { NotFoundError } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
//describe: 말하다, 묘사하다의 의미로 테스트를 의미
describe('MoviesService', () => {
  let service: MoviesService;

  //각각의 테스트를 진행하기 전에 실행되는 로직
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2+2).toEqual(4)
  });

  describe("getAll", () => {
    
    it("should retern array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    })

  })

  describe("getOne", () => {

    

    it("should be retern a movie", () => {
      service.create({
        title: "test",
        genres: ["genres"],
        year: 1111
      })
      const result = service.getOne(1)
      expect(result.id).toEqual(1)
    })
    it("should ge return 404", () => {
      try {
        service.getOne(9999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe("update", () => {
    
    it("should be updated", () => {
      service.create({
        title: "test",
        genres: ["genres"],
        year: 1111
      });
      service.update(1, {
        "title" : "updated"
      });
      const updateMovie = service.getOne(1);
      expect(updateMovie.title).toEqual("updated");
    });
  });



  describe("delete", () => {

    it("should be deleted", () => {
      service.create({
        title: "test",
        genres: ["genres"],
        year: 1111
      });
      service.deleteOne(1);
      try {
        service.getOne(1);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }

      }) 
  })
});
