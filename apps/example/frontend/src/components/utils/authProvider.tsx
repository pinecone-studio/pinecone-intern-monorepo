"use client"
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie"

interface User {
    _id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    resetPasswordToken?: string;
    __v: number;
}
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const authPaths = ["/save", "/buy"];

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<User>({} as User);
    const [isReady, setIsReady] = useState<boolean>(false);
    const login = async (email: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            Cookies.set("token", res.data.token);
            setUser(res.data.user);
            toast.success(res.data.message);
            router.replace("/");
        } catch (err: unknown) {
            console.log(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Login failed.");
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };
    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await api.post("/auth/register", { name, email, password });
            Cookies.set('token', res.data.token);
            setUser(res.data.user);
            toast.success(res.data.message);
            router.push("/");
        } catch (err: unknown) {
            console.log(err);
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Registration failed.");
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };
    const forgotPassword = async (email: string) => {
        try {
            const res = await api.post("/auth/forgot-password", { email })
            toast.success(res.data.message);
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to send password reset link")
            } else {
                toast.error("An unknown error occurred")
            }
        }
    }
    const logout = async () => {
        try {
            const res = await api.post("/auth/logout")
            Cookies.remove("token");
            setUser({} as User)
            toast.info(res.data.message)
        } catch (err: unknown) {
            console.log(err)
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to logout")
            } else {
                toast.error("An unknown error occurred")
            }
        }
    }
    useEffect(() => {
        const loadUser = async () => {
            try {
                setIsReady(false);

                const token = Cookies.get("token");
                if (!token) return;

                const res = await api.get("/auth/check-auth", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data.user);
            } catch (err: unknown) {
                console.log(err);
                Cookies.remove("token");
                if (err instanceof AxiosError) {
                    toast.error(err.response?.data?.message || "Your session has expired. Please login again.");
                } else {
                    toast.error("An unknown error occurred.");
                }
            } finally {
                setIsReady(true);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        if (!authPaths.includes(pathname)) return;

        if (!isReady) return;

        if (!user) router.replace("/login");
    }, [pathname, user, isReady, router]);

    if (!isReady) return null;
    return (
        <AuthContext.Provider value={{ user, login, register, forgotPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};