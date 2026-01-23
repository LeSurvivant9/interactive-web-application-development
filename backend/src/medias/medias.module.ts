import { Module } from "@nestjs/common";
import { PrismaModule } from "../database/prisma/prisma.module";
import { TvdbModule } from "../tvdb/tvdb.module";
import { MediasService } from "./medias.service";

@Module({
  imports: [PrismaModule, TvdbModule],
  providers: [MediasService],
  exports: [MediasService],
})
export class MediasModule {}
