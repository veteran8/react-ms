import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications
} from "../views";

export const mainRoutes = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  }
];

export const adminRoutes = [
  {
    pathname: "/admin/dashboard",
    component: Dashboard,
    title: "仪表盘",
    isNav: true,
    icon: "dashboard"
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: "setting"
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章管理",
    isNav: true,
    icon: "unordered-list"
  },
  {
    pathname: "/admin/edit/:id",
    component: ArticleEdit
  },
  {
    pathname: "/admin/notifications",
    component: Notifications,
    title: "通知中心"
  }
];
