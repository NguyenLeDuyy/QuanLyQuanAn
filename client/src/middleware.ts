import { NextResponse, NextRequest } from 'next/server'

const privatePaths = ['/manage',]
const unAuthPaths = ['/login',]


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isAuth = Boolean(request.cookies.get('accessToken'))

    // Chưa đăng nhập thì không cho vào private Paths
    if (privatePaths.some(path => pathname.startsWith(path) && !isAuth)) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // Đã đăng nhập thì không cho vào login
    if (unAuthPaths.some(path => pathname.startsWith(path) && isAuth)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/manage/:path*', '/login',],
}