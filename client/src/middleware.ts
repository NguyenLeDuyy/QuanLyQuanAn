import { NextResponse, NextRequest } from 'next/server'

const privatePaths = ['/manage',]
const unAuthPaths = ['/login',]


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    // Chưa đăng nhập thì không cho vào private Paths
    if (privatePaths.some(path => pathname.startsWith(path) && !refreshToken)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // Đã đăng nhập thì không cho vào login
    if (unAuthPaths.some(path => pathname.startsWith(path) && refreshToken)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // Đăng nhập rồi nhưng accessToken đã hết hạn 
    if (privatePaths.some(path => pathname.startsWith(path) && !accessToken && refreshToken)) {
        const url = new URL('/logout', request.url)
        url.searchParams.set('refreshToken', refreshToken ?? '')
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/manage/:path*', '/login',],
}