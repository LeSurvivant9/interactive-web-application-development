import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "../auth/types";
import { CommentsService } from "./comments.service";
import { AddCommentInput } from "./dto/add-comment.input";
import { Comment } from "./models/comment.model";

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comment], { name: "mediaComments" })
  async getMediaComments(@Args("tvdbId") tvdbId: string) {
    return this.commentsService.findByTvdbId(tvdbId);
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Args("input") input: AddCommentInput,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.commentsService.addComment(user.userId, input);
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Args("commentId", { type: () => Int }) commentId: number,
    @Args("content") content: string,
    @Args("containsSpoiler") containsSpoiler: boolean,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.commentsService.updateComment(
      user.userId,
      commentId,
      content,
      containsSpoiler,
    );
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async removeComment(
    @Args("commentId", { type: () => Int }) commentId: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.commentsService.removeComment(user.userId, commentId);
  }
}
