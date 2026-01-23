import { Module } from "@nestjs/common";
import { PrismaModule } from "../database/prisma/prisma.module";
import { MediasModule } from "../medias/medias.module";
import { TvdbModule } from "../tvdb/tvdb.module";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";

@Module({
  imports: [PrismaModule, TvdbModule, MediasModule],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
