"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useMemo } from "react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql",
});

const createErrorLink = () => {
  return new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const err of error.errors) {
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.extensions?.status === 401
        ) {
          void signOut();
        }
      }
    } else if (
      error &&
      "statusCode" in error &&
      (error as { statusCode: number }).statusCode === 401
    ) {
      void signOut();
    }
  });
};

const createAuthLink = (accessToken?: string) => {
  return new SetContextLink(({ headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });
};

const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const client = useMemo(() => {
    const errorLink = createErrorLink();
    const authLink = createAuthLink(session?.user?.accessToken);

    return new ApolloClient({
      link: ApolloLink.from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [session]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ApolloWrapper>{children}</ApolloWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}
