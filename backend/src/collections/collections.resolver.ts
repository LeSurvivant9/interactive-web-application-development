import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AuthenticatedUser } from "../auth/types";
import { CollectionsService } from "./collections.service";
import { AddToCollectionInput } from "./dto/add-to-collection.input";
import { UserMedia } from "./models/user-media.model";

@Resolver()
@UseGuards(JwtAuthGuard)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Mutation(() => UserMedia)
  async addToCollection(
    @Args("input") input: AddToCollectionInput,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.collectionsService.addToCollection(user.userId, input);
  }

  @Query(() => UserMedia, { name: "collectionEntry", nullable: true })
  async getCollectionEntry(
    @Args("tvdbId") tvdbId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.collectionsService.findOneByTvdbId(user.userId, tvdbId);
  }

  @Mutation(() => UserMedia)
  async removeFromCollection(
    @Args("tvdbId") tvdbId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.collectionsService.removeFromCollection(user.userId, tvdbId);
  }

  @Mutation(() => UserMedia)
  async rateMedia(
    @Args("tvdbId") tvdbId: string,
    @Args("rating", { type: () => Int }) rating: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.collectionsService.rateMedia(user.userId, tvdbId, rating);
  }
}
