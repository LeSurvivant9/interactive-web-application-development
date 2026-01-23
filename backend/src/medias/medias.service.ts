import { Injectable, Logger } from "@nestjs/common";
import { MediaType } from "../../prisma/generated/client/enums";
import { PrismaService } from "../database/prisma/prisma.service";
import { TvdbService } from "../tvdb/tvdb.service";

@Injectable()
export class MediasService {
  private readonly logger = new Logger(MediasService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tvdbService: TvdbService,
  ) {}

  /**
   * Cherche le média en BDD, s'il n'existe pas, va le chercher sur TVDB et le crée.
   */
  async findOrCreate(tvdbId: string, type: MediaType) {
    const existingMedia = await this.prisma.media.findUnique({
      where: { tvdbId },
    });

    if (existingMedia) {
      return existingMedia;
    }

    this.logger.log(`Média ${tvdbId} inconnu, récupération depuis TVDB...`);
    const details = await this.tvdbService.getMediaDetails(tvdbId, type);

    return this.prisma.media.create({
      data: {
        tvdbId: details.tvdb_id,
        title: details.name,
        originalTitle: details.original_name,
        synopsis: details.overview,
        posterPath: details.image_url,
        releaseDate: details.release_date,
        status: details.status,
        type: details.type,
      },
    });
  }
}
