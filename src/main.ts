import { NestFactory } from '@nestjs/core';
// import { OnApplicationBootstrap } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import * as rateLimit from 'express-rate-limit';
import { AllExceptionsFilter } from './filter/any-exception.filter'
import { ValidationPipe } from './pipes/validate.pipe';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置全局的路由前缀
  app.setGlobalPrefix('api');

  app.use(
    // 限速
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // 接口文档
  const options = new DocumentBuilder()
    .setTitle('彩虹海🌈接口API')
    .setVersion('1.0.0')
    .addTag('Rainbow-Sea')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidoc', app, document);

  // 注册全局过滤器
  app.useGlobalFilters(new AllExceptionsFilter());

  // 注册全局的请求参数校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 注册全局的拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(3333);
}
bootstrap();
