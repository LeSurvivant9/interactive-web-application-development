import { IncomingMessage } from "node:http";
import { join } from "node:path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { LoggerModule } from "nestjs-pino";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { CollectionsModule } from "./collections/collections.module";
import { CommentsModule } from "./comments/comments.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { AtLeastOneGqlExceptionFilter } from "./common/filters/gql-exceptions.filter";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";
import configuration from "./config/configuration";
import { validate } from "./config/env.validation";
import { PrismaModule } from "./database/prisma/prisma.module";
import { HealthModule } from "./health/health.module";
import { MediasModule } from "./medias/medias.module";
import { TvdbModule } from "./tvdb/tvdb.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: join(process.cwd(), ".env"),
      validate,
      cache: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      introspection: process.env.NODE_ENV !== "production",
      playground: process.env.NODE_ENV !== "production",
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== "production"
            ? { target: "pino-pretty", options: { colorize: true, sync: true } }
            : undefined,
        serializers: {
          req: (req: IncomingMessage) => {
            const reqWithId = req as IncomingMessage & { id?: string | number };
            return {
              id: reqWithId.id,
              method: req.method,
              url: req.url,
            };
          },
        },
      },
    }),
    AuthModule,
    HealthModule,
    PrismaModule,
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 30 * 60 * 1000,
      max: 1000,
    }),
    TvdbModule,
    MediasModule,
    CollectionsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AtLeastOneGqlExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
