import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { PrismaService } from "../database/prisma/prisma.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const passwordHash = await argon2.hash(createUserInput.password);

    return this.prisma.user.create({
      data: {
        email: createUserInput.email,
        username: createUserInput.username,
        passwordHash,
        role: "USER",
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
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

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
