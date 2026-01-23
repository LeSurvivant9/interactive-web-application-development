import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MediaType, WatchStatus } from "../../../prisma/generated/client/enums";

registerEnumType(MediaType, { name: "MediaType" });
registerEnumType(WatchStatus, { name: "WatchStatus" });

@InputType()
export class AddToCollectionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  tvdbId: string;

  @Field(() => MediaType)
  @IsEnum(MediaType)
  type: MediaType;

  @Field(() => WatchStatus)
  @IsEnum(WatchStatus)
  status: WatchStatus;
}
