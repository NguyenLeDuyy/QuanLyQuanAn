"use client";

import {
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
    const checkAndRefreshToken = async () => {
      // Không nên đưa logic lấy access và refresh tokjen ra khỏi function `checkAndRefreshToken`
      // Vì để mỗi lần mà checkAndRefreshToken() đc gọi sẽ có 1 access và refresh token mới
      // Tránh hiện tượng bug nó lấy access và refresh token cũ ở lần đầu để gọi cho các lần tiếp theo
      const accessToken = getAccessTokenFromLocalStorage();
      const refreshToken = getRefreshTokenFromLocalStorage();
      // Nếu chưa đăng nhập cũng không cho chạy
      if (!accessToken || !refreshToken) return;
      const decodedAccessToken = jwt.decode(accessToken) as {
        exp: number;
        iat: number;
      };
      const decodedRefreshToken = jwt.decode(refreshToken) as {
        exp: number;
        iat: number;
      };
      // Thời đeierm hết hạn của token là tính theo epoch time (s)
      // Còn khi dùng cú pháp new Date().getTime() thì nó trả về epoch time (ms)
      const now = Math.round(new Date().getTime() / 1000);
      // Trường hợp refresh token thì không xử lý nữa
      // Thì mình sẽ ktra còn 1/3 thời gian (3s) thì sẽ cho refresh token lại
      // Ví đụ aToken của chta có expired time là 10s
      // Thì tgian còn lại sẽ tính dựa trên công thức: decodedAccessToken.exp - now
      // Access token's Expired time base on công thức: decodedAccessToken.exp - decodedAccessToken.iat
      if (
        decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
      ) {
        // Goi API refresh token
        try {
          const res = await authApiRequest.refreshToken();
          setAccessTokenToLocalStorage(res.payload.data.accessToken);
          setRefreshTokenToLocalStorage(res.payload.data.refreshToken);
        } catch (error) {
          clearInterval(interval);
        }
      }
    };
    // Phải gọi lần đầu tiên, vì interval sẽ chạy sau tgian TIMEOUT
    checkAndRefreshToken();
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
