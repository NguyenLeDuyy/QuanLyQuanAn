"use client";

import { useAppContext } from "@/components/app-provider";
import Link from "next/link";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu", // Chưa đăng nhập thì vẫn có thể xem menu
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    authRequired: true,
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false, // Chưa đăng nhập thì mới hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true, // Chỉ hiển thị khi đã đăng nhập
  },
];

// Server: Món ăn, Đơn hàng, Đăng nhập. Do sever không biết người dùng đã đăng nhập hay chưa
// Client: Đầu tiên sẽ hiển thị Món ăn, Đơn hàng, Đăng nhập.
// Sau đó Món ăn, Đơn hàng, Đăng nhập, Quản lý sẽ được hiển thị
// Do client biết người dùng đã đăng nhập hay chưa thông qua access token trong localStorage

export default function NavItems({ className }: { className?: string }) {
  const { isAuth } = useAppContext();

  return menuItems.map((item) => {
    if (
      (item.authRequired === false && isAuth) ||
      (item.authRequired === true && !isAuth)
    )
      return null;

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
