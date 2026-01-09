import "reflect-metadata";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn", "log", "debug", "verbose"],
    });

    app.useGlobalPipes(new ValidationPipe());

    const port = process.env.PORT ?? 3000;
    await app.listen(port, "0.0.0.0");
    logger.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    logger.error("Erreur fatale au démarrage :");
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
