import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TvdbResolver } from "./tvdb.resolver";
import { TvdbService } from "./tvdb.service";

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [TvdbService, TvdbResolver],
  exports: [TvdbService],
})
export class TvdbModule {}
