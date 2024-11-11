// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readIsValid } from "@/authentication/session";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = readIsValid();
      setIsAuthenticated(valid);
      setIsLoading(false);

      if (!valid) {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  return { isLoading, isAuthenticated };
}
