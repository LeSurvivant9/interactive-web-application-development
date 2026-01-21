import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { GraphQLSchemaHost } from "@nestjs/graphql";
import { execute, parse } from "graphql";
import { PrismaService } from "../prisma/prisma.service";
import { TvdbService } from "../tvdb/tvdb.service";

@Injectable()
export class HealthService {
  private schemaHost: GraphQLSchemaHost;
  constructor(
    private prisma: PrismaService,
    private tvdb: TvdbService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.schemaHost = this.moduleRef.get(GraphQLSchemaHost, { strict: false });
  }

  async check() {
    const result = {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "unknown",
      graphql: "unknown",
      tvdb: "unknown",
      errors: [],
    };

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      result.database = "connected";
    } catch (error) {
      result.status = "error";
      result.database = "disconnected";
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`DB: ${message}`);
    }

    try {
      const { schema } = this.schemaHost;

      const gqlResult = await execute({
        schema,
        document: parse("{ __typename }"),
      });

      if (gqlResult.errors && gqlResult.errors.length > 0) {
        result.status = "error";
        result.graphql = "failed";
        result.errors.push(`GQL: ${gqlResult.errors[0].message}`);
      } else {
        result.graphql = "ready";
      }
    } catch (error) {
      result.status = "error";
      result.graphql = "failed";
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`GQL: ${message}`);
    }

    try {
      const isTvdbConnected = await this.tvdb.checkConnection();
      if (isTvdbConnected) {
        result.tvdb = "connected";
      } else {
        result.status = "error";
        result.tvdb = "disconnected";
        result.errors.push("TVDB: Connection failed");
      }
    } catch (error) {
      result.status = "error";
      result.tvdb = "failed";
      const message = error instanceof Error ? error.message : String(error);
      result.errors.push(`TVDB: ${message}`);
    }

    return result;
  }
}
