"use client";

import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Những page sau sẽ không check refresh token
const UNAUTHENTICATED_PATH = ["/login", "/register", "/refresh-token"];
export default function RefreshToken() {
  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let interval: any = null;
  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return;
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau tgian TIMEOUT
    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
        router.push("/login");
      },
    });
    // Timeout interval phải < accessToken's expired time
    // Ví dụ tgia hết hạn của AT là 10s thì 1s ta sẽ check 1 lần
    const TIMEOUT = 1000;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
          },
        }),
      TIMEOUT
    );
    return () => {
      clearInterval(interval);
    };
  }, [pathname, router]);
  return null;
}
