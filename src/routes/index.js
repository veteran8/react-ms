import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications,
  NoAuth
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
    icon: "dashboard",
    roles: ["001", "002", "003"]
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true,
    title: "文章管理",
    isNav: true,
    icon: "unordered-list",
    roles: ["001", "002"]
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    title: "设置",
    isNav: true,
    icon: "setting",
    roles: ["001", "002", "003"]
  },
  {
    pathname: "/admin/edit/:id",
    component: ArticleEdit,
    roles: ["001"]
  },
  {
    pathname: "/admin/notifications",
    component: Notifications,
    title: "通知中心",
    roles: ["001", "002", "003"]
  },
  {
    pathname: "/admin/noAuth",
    component: NoAuth,
    roles: ["001", "002", "003"]
  }
];
