import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    ///테스트 시에도 실제 어어플리케이션이 구동되는 환경을 똑같이 해줘야 함
    app.useGlobalPipes(new ValidationPipe({
      ///어떠한 Decorator 도 없는 어떠한 값의 객체를 걸러줌
      whitelist: true,
      ///request에 비정상적인 값이 있다면 response에 그 사실을 알려줌
      forbidNonWhitelisted: true,
      ///request의 값의 타입이 DTO와 맞지 않을 때 자동으로 타입을 바꿔줌
      transform: true,
    }))
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome');
  });

  describe("/moveis", () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([])
    })


    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "test",
          genres: ["tesetests"],
          year: 20000
        })
        .expect(201)
    })
    it("DELETE", () => {
      return request(app.getHttpServer()).delete("/movies").expect(404)
    })
  })

  describe("/movies/:id", () => {
    it("GET 200", () => {
        return request(app.getHttpServer())
          .get("/movies/1")
          .expect(200)
    })
    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/4051")
        .expect(404)
    })
    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch("/movies/1")
        .send({title: "patched"})
        .expect(200)
    })
    it("DELETE 200" , () => {
      return request(app.getHttpServer())
        .delete("/movies/1")
        .expect(200)
    })
})


});
