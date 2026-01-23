import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MediaType, SyncStatus } from "../../../prisma/generated/client/enums";

registerEnumType(SyncStatus, { name: "SyncStatus" });

@ObjectType()
export class Media {
  @Field(() => Int)
  id: number;

  @Field()
  tvdbId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  originalTitle?: string;

  @Field({ nullable: true })
  synopsis?: string;

  @Field({ nullable: true })
  posterPath?: string;

  @Field({ nullable: true })
  releaseDate?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field(() => MediaType)
  type: MediaType;

  @Field(() => SyncStatus)
  syncStatus: SyncStatus;

  @Field(() => Date)
  createdAt: Date;
}
