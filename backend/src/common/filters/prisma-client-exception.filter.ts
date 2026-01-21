import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { GraphQLError } from "graphql";
import { Prisma } from "../../../prisma/generated/client/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (host.getType().toString() === "graphql") {
      return this.handleGqlException(exception);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case "P2002": {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: "Nom d'utilisateur ou adresse mail déjà utilisé",
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }

  private handleGqlException(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case "P2002": {
        return new GraphQLError(
          "Nom d'utilisateur ou adresse mail déjà utilisé",
          {
            extensions: {
              code: "CONFLICT",
              status: HttpStatus.CONFLICT,
            },
          },
        );
      }
      default:
        return exception;
    }
  }
}
