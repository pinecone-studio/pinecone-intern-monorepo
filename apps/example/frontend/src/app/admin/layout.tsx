"use client"
import { AdminContainer } from "@/components/admin";
import { useAuth } from "@/components/utils/authProvider";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    const { user } = useAuth()
    if (user?.role === 'ADMIN' || user?.role === 'GOD') {
        return <AdminContainer>
            {children}
        </AdminContainer>;
    }
    return <div>404</div>;
}
