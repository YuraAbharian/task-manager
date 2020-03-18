import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';
async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  const port = serverConfig.port;
  await app.listen(port);
}
bootstrap();
