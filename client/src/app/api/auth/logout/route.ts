/* eslint-disable @typescript-eslint/no-unused-vars */
import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    if (!accessToken || !refreshToken) {
        return Response.json({
            message: 'Không nhận được accessToken hoặc refreshToken.',
        }, {
            status: 200
        })
    }
    try {
        const result = await authApiRequest.sLogout({
            accessToken,
            refreshToken
        });

        return Response.json(result.payload)
    } catch (error) {

        return Response.json({
            message: 'Lỗi khi gọi API đến server Backend',
        }, {
            status: 200
        })
    }
}