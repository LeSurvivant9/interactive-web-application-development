import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";
import { MediaType } from "../../../prisma/generated/client/enums";

@InputType()
export class AddCommentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  tvdbId: string;

  @Field(() => MediaType)
  type: MediaType;

  @Field()
  @IsString()
  @Length(3, 1000)
  content: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  containsSpoiler: boolean;
}
