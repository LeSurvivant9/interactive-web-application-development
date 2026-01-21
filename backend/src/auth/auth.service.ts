import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UsersService } from "../users/users.service";
import { AuthPayload } from "./dto/auth-payload";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const { email, password } = loginInput;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Adresse mail ou mot de passe incorrect");
    }

    try {
      const isPasswordValid = await argon2.verify(user.passwordHash, password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(
          "Adresse mail ou mot de passe incorrect",
        );
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error("Password verification error:", error);
      console.error("User email:", user.email);
      console.error("Hash prefix:", user.passwordHash.substring(0, 15));
      throw new UnauthorizedException("Adresse mail ou mot de passe incorrect");
    }

    const payload = { sub: user.id, username: user.username, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
