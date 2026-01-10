"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import { SessionProvider, useSession } from "next-auth/react";
import React, { useMemo } from "react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/graphql",
});

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const client = useMemo(() => {
    const authLink = new SetContextLink(({ headers }) => {
      const token = session?.user?.accessToken;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: ApolloLink.from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [session]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  );
}
