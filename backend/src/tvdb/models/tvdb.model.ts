import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { MediaType } from "../../../prisma/generated/client/enums";

@ObjectType()
export class TvdbSearchResult {
  @Field(() => ID, { nullable: true })
  tvdb_id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  image_url: string;

  @Field({ nullable: true })
  overview: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  year: string;
}

@ObjectType()
export class TvdbGenre {
  @Field()
  id: number;
  @Field()
  name: string;
}

@ObjectType()
export class TvdbMediaDetails {
  @Field()
  tvdb_id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  original_name?: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field({ nullable: true })
  banner_url?: string;

  @Field({ nullable: true })
  overview?: string;

  @Field()
  type: MediaType;

  @Field({ nullable: true })
  year?: string;

  @Field({ nullable: true })
  release_date?: Date;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => Int, { nullable: true })
  runtime?: number;

  @Field(() => [TvdbGenre], { nullable: true })
  genres?: TvdbGenre[];
}
