"use client";

import envConfig from "@/config";
import { getAccessTokenFromLocalStorage } from "@/lib/utils";
import { io } from "socket.io-client";

export const socket = io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: {
        Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    },
    autoConnect: false, // Không tự động kết nối khi vừa mới truy cập trang web
});

export default socket;