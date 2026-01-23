import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { WatchStatus } from "../../../prisma/generated/client/enums";
import { Media } from "../../medias/models/media.model";

@ObjectType()
export class UserMedia {
  @Field(() => ID)
  id: number;

  @Field(() => WatchStatus)
  status: WatchStatus;

  @Field(() => Media)
  media: Media;

  @Field(() => Date)
  addedAt: Date;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
