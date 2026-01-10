import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { AuthPayload } from "./dto/auth-payload";
import { LoginInput } from "./dto/login.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthPayload)
  async login(@Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
