/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  checkAndRefreshToken,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";

// Những page sau sẽ không check refresh token
const UNAUTHENTICATED_PATH = ["/login", "/register", "/refresh-token"];
export default function RefreshToken() {
  const pathname = usePathname();
  console.log(pathname);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let interval: any = null;
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau tgian TIMEOUT
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
      },
    });
    // Timeout interval phải < accessToken's expired time
    // Ví dụ tgia hết hạn của AT là 10s thì 1s ta sẽ check 1 lần
    const TIMEOUT = 1000;
    interval = setInterval(checkAndRefreshToken, TIMEOUT);
    return () => {
      clearInterval(interval);
    };
  }, [pathname]);
  return null;
}
