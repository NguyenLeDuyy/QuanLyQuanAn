import {
  Home,
  ShoppingCart,
  Users2,
  Salad,
  Table,
  BarChart,
} from "lucide-react";

const menuItems = [
  {
    title: "Trang chủ",
    Icon: Home,
    href: "/",
  },
  {
    title: "Bảng điều khiển",
    Icon: BarChart,
    href: "/manage/dashboard",
  },
  {
    title: "Đơn hàng",
    Icon: ShoppingCart,
    href: "/manage/orders",
  },
  {
    title: "Bàn ăn",
    Icon: Table,
    href: "/manage/tables",
  },
  {
    title: "Món ăn",
    Icon: Salad,
    href: "/manage/dishes",
  },
  {
    title: "Nhân viên",
    Icon: Users2,
    href: "/manage/accounts",
  },
];

export default menuItems;
