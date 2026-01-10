import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn", "log", "debug", "verbose"],
    });
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();

    const port = process.env.PORT ?? 3000;
    await app.listen(port, "0.0.0.0");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap().catch((err) => {
  console.error("Critical error during bootstrap:");
  console.error(err);
  process.exit(1);
});
