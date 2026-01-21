import { Field, ID, ObjectType } from "@nestjs/graphql";

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
