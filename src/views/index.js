import { Loading } from "../components";
import Loadable from "react-loadable";

const Dashboard = Loadable({
  loader: () => {
    return import("./Dashboard/Dashboard");
  },
  loading: Loading
});

const Login = Loadable({
  loader: () => {
    return import("./Login/Login");
  },
  loading: Loading
});

const NotFound = Loadable({
  loader: () => {
    return import("./NotFound/NotFound");
  },
  loading: Loading
});

const Settings = Loadable({
  loader: () => {
    return import("./Settings/Settings");
  },
  loading: Loading
});

const ArticleList = Loadable({
  loader: () => {
    return import("./Article/ArticleList");
  },
  loading: Loading
});

const ArticleEdit = Loadable({
  loader: () => {
    return import("./Article/Edit");
  },
  loading: Loading
});

const Notifications = Loadable({
  loader: () => {
    return import("./Notifications/Notifications");
  },
  loading: Loading
});

const NoAuth = Loadable({
  loader: () => {
    return import("./NoAuth/NoAuth");
  },
  loading: Loading
});
export {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications,
  NoAuth
};
