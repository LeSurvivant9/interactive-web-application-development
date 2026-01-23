import { Module } from "@nestjs/common";
import { PrismaModule } from "../database/prisma/prisma.module";
import { TvdbModule } from "../tvdb/tvdb.module";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

@Module({
  imports: [PrismaModule, TvdbModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
