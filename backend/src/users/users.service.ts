import { ConflictException, Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const passwordHash = await argon2.hash(createUserInput.password);

    try {
      return await this.prisma.user.create({
        data: {
          username: createUserInput.username,
          email: createUserInput.email,
          passwordHash,
          role: "USER",
        },
      });
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Username ou Email déjà utilisé");
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const { password, ...data } = updateUserInput;

    const updateData: Record<string, unknown> = { ...data };
    delete updateData.id;

    if (password) {
      updateData.passwordHash = await argon2.hash(password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
