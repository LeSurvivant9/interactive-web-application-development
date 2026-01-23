import { Module } from "@nestjs/common";
import { MediasModule } from "../medias/medias.module";
import { CollectionsResolver } from "./collections.resolver";
import { CollectionsService } from "./collections.service";

@Module({
  imports: [MediasModule],
  providers: [CollectionsService, CollectionsResolver],
})
export class CollectionsModule {}
