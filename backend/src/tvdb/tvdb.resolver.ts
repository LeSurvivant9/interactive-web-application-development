import { Args, Query, Resolver } from "@nestjs/graphql";
import { Public } from "../auth/decorators/public.decorator";
import { TvdbSearchResult } from "./tvdb.model";
import { TvdbService } from "./tvdb.service";

@Resolver()
export class TvdbResolver {
  constructor(private readonly tvdbService: TvdbService) {}

  @Public()

  @Query(() => [TvdbSearchResult], { name: "searchMedia" })
  async searchMedia(@Args("query") query: string) {
    if (query.length < 3) {
      return [];
    }
    return this.tvdbService.search(query);
  }
}
