// apollowrapper.tsx
"use client";
import React, { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri =
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  process.env.BACKEND_URL ??
  "http://localhost:4200/api/graphql";

const httpLink = createHttpLink({ uri });

// authLink reads token (safe to call in browser only)
const authLink = setContext((_, { headers }) => {
  if (typeof window === "undefined") {
    // server-side: return headers unmodified
    return { headers };
  }
  const token = window.localStorage.getItem("token");
  console.log("Apollo authLink - token exists:", !!token);
  if (token) {
    console.log("Apollo authLink - token length:", token.length);
    console.log("Apollo authLink - token preview:", token.substring(0, 20) + "...");
    console.log("Apollo authLink - authorization header:", `Bearer ${token}`);
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const ApolloWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
