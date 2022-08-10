import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ///타입을 검증할수 있도록 도와주는 미들웨어
  app.useGlobalPipes(new ValidationPipe({
    ///어떠한 Decorator 도 없는 어떠한 값의 객체를 걸러줌
    whitelist: true,
    ///request에 비정상적인 값이 있다면 response에 그 사실을 알려줌
    forbidNonWhitelisted: true,
    ///request의 값의 타입이 DTO와 맞지 않을 때 자동으로 타입을 바꿔줌
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap();
