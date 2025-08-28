// layout.tsx
"use client";
import "./global.css";
import { PropsWithChildren } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "@/components/Sidebar";
import { PostProvider } from "@/components/context/PostContext";
import { ApolloWrapper } from "@/components/providers/ApolloWrapper";
import { AuthProvider } from "@/components/providers/AuthProvider";
import CreatePost from "./(main)/create/page";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>         
          <AuthProvider>
            <PostProvider>
              <CreatePost />
              <div className="flex flex-row">
                <div className="w-fit">
                  <Sidebar />
                </div>
                <div className="flex-1 ml-[300px] mx-auto">{children}</div>
              </div>
            </PostProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
