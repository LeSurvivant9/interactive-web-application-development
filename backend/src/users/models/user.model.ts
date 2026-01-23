import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Role } from "../../../prisma/generated/client/enums";

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
