import { Args, Query, Resolver } from "@nestjs/graphql";
import { MediaType } from "../../prisma/generated/client/enums";
import { TvdbMediaDetails, TvdbSearchResult } from "./models/tvdb.model";
import { TvdbService } from "./tvdb.service";

@Resolver()
export class TvdbResolver {
  constructor(private readonly tvdbService: TvdbService) {}

  @Query(() => [TvdbSearchResult], { name: "searchMedia" })
  async searchMedia(@Args("query") query: string) {
    if (query.length < 3) {
      return [];
    }
    return this.tvdbService.search(query);
  }

  @Query(() => [TvdbSearchResult], { name: "popularMovies" })
  async getPopularMovies() {
    return this.tvdbService.getPopularMovies();
  }

  @Query(() => [TvdbSearchResult], { name: "popularSeries" })
  async getPopularSeries() {
    return this.tvdbService.getPopularSeries();
  }

  @Query(() => TvdbMediaDetails, { name: "mediaDetails" })
  async getMediaDetails(
    @Args("tvdbId") tvdbId: string,
    @Args("type") type: MediaType,
  ) {
    return this.tvdbService.getMediaDetails(tvdbId, type);
  }
}
