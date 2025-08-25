"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { PropsWithChildren } from "react"

const uri =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.BACKEND_URL ??
  "http://localhost:4200/api/graphql";

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    const client = new ApolloClient({
        uri,
        cache: new InMemoryCache(),
    });
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}