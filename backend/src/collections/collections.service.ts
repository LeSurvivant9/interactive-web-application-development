import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { MediasService } from "../medias/medias.service";
import { AddToCollectionInput } from "./dto/add-to-collection.input";

@Injectable()
export class CollectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediasService: MediasService,
  ) {}

  async findOneByTvdbId(userId: string, tvdbId: string) {
    const media = await this.prisma.media.findUnique({
      where: { tvdbId },
      select: { id: true },
    });

    if (!media) {
      return null;
    }

    return this.prisma.userMedia.findUnique({
      where: {
        userId_mediaId: {
          userId,
          mediaId: media.id,
        },
      },
      include: {
        media: true,
      },
    });
  }

  async removeFromCollection(userId: string, tvdbId: string) {
    const media = await this.prisma.media.findUnique({
      where: { tvdbId },
      select: { id: true },
    });

    if (!media) {
      throw new Error("Média introuvable");
    }

    return this.prisma.userMedia.delete({
      where: {
        userId_mediaId: {
          userId,
          mediaId: media.id,
        },
      },
      include: {
        media: true,
      },
    });
  }

  async addToCollection(userId: string, input: AddToCollectionInput) {
    const media = await this.mediasService.findOrCreate(
      input.tvdbId,
      input.type,
    );

    return this.prisma.userMedia.upsert({
      where: {
        userId_mediaId: {
          userId: userId,
          mediaId: media.id,
        },
      },
      update: {
        status: input.status,
      },
      create: {
        userId: userId,
        mediaId: media.id,
        status: input.status,
      },
      include: {
        media: true,
      },
    });
  }

  async rateMedia(userId: string, tvdbId: string, rating: number) {
    const media = await this.prisma.media.findUnique({
      where: { tvdbId },
      select: { id: true },
    });

    if (!media) {
      throw new BadRequestException(
        "Ce média n'est pas dans votre collection.",
      );
    }

    try {
      return await this.prisma.userMedia.update({
        where: {
          userId_mediaId: {
            userId: userId,
            mediaId: media.id,
          },
        },
        data: {
          rating: rating,
        },
        include: { media: true },
      });
    } catch {
      throw new BadRequestException(
        "Vous devez ajouter ce média à votre collection avant de le noter.",
      );
    }
  }
}
