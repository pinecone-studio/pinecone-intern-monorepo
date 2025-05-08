// hooks/useAuth.ts
import { useMeQuery } from "@/generated";

export const useAuth = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data, loading } = useMeQuery({
    skip: !token,
  });

  return {
    user: data?.me,
    isLoggedIn: !!data?.me,
    loading,
  };
};
