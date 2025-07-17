"use client";

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
        router.push("/login");
        setTimeout(() => {
          ref.current = null;
        }, 1000);
      });
    } else {
      router.push("/");
    }
  }, [accessTokenFromUrl, mutateAsync, refreshTokenFromUrl, router]);
  return <div>Logging out....</div>;
}
