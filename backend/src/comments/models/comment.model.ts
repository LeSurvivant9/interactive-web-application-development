import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  containsSpoiler: boolean;

  @Field()
  postedAt: Date;

  @Field(() => User)
  user: User;
}
