"use client";

import { useAppContext } from "@/components/app-provider";
import { getRefreshTokenFromLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LogoutPage() {
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const { setRole } = useAppContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  useEffect(() => {
    if (
      (!ref.current &&
        refreshTokenFromUrl &&
        refreshTokenFromUrl === getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl === getRefreshTokenFromLocalStorage())
    ) {
      ref.current = mutateAsync;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mutateAsync().then((res) => {
        setTimeout(() => {
          ref.current = null;
        }, 1000);
        router.push("/login");
        setRole();
      });
    } else {
      router.push("/");
    }
  }, [accessTokenFromUrl, mutateAsync, refreshTokenFromUrl, router, setRole]);
  return <div>Logging out....</div>;
}
