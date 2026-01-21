import { Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { GraphQLError } from "graphql";

@Catch()
export class AtLeastOneGqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error | HttpException) {
    let message = "Internal server error";
    let code = "INTERNAL_SERVER_ERROR";
    let status = 500;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === "string") {
        message = response;
      } else if (typeof response === "object" && response !== null) {
        const responseObj = response as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        code = (responseObj.error as string) || code;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      if (
        message.includes("UnsupportedAlgorithm") ||
        message.includes("PASSWORD_UNSUPPORTED_ALGORITHM")
      ) {
        message =
          "Votre mot de passe utilise un algorithme de sécurité obsolète ou non supporté. Veuillez le réinitialiser ou contacter le support.";
      }
    }

    return new GraphQLError(message, {
      extensions: {
        code,
        status,
      },
    });
  }
}
