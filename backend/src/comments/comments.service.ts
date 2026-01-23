import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";
import { MediasService } from "../medias/medias.service";
import { AddCommentInput } from "./dto/add-comment.input";

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private mediasService: MediasService,
  ) {}

  async addComment(userId: string, input: AddCommentInput) {
    const media = await this.mediasService.findOrCreate(
      input.tvdbId,
      input.type,
    );

    return this.prisma.comment.create({
      data: {
        content: input.content,
        containsSpoiler: input.containsSpoiler,
        userId: userId,
        mediaId: media.id,
      },
      include: {
        user: true,
      },
    });
  }

  async findByTvdbId(tvdbId: string) {
    const media = await this.prisma.media.findUnique({
      where: { tvdbId },
      select: { id: true },
    });

    if (!media) {
      return [];
    }

    return this.prisma.comment.findMany({
      where: { mediaId: media.id },
      orderBy: { postedAt: "desc" },
      include: { user: true },
    });
  }

  async updateComment(
    userId: string,
    commentId: number,
    content: string,
    containsSpoiler: boolean,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Commentaire introuvable");
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        "Vous ne pouvez modifier que vos propres commentaires",
      );
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content, containsSpoiler },
      include: { user: true },
    });
  }

  async removeComment(userId: string, commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Commentaire introuvable");
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(
        "Vous ne pouvez supprimer que vos propres commentaires",
      );
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
      include: { user: true },
    });
  }
}
