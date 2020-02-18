import axios from "axios";
import { message } from "antd";

const isDev = process.env.NODE_ENV === "development";
const service = axios.create({
  baseURL: isDev ? "http://rap2api.taobao.org/app/mock/244674" : ""
});

service.interceptors.request.use(config => {
  config.data = Object.assign({}, config.data, {
    authtoken: "fdfdsfadsfdsf"
  });
  return config;
});

service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data;
  } else {
    //全局处理错误
    message.error(res.data.errMsg);
  }
});

export const getArtciles = (offset = 0, limited = 10) => {
  return service.post("/api/v1/articleList", {
    offset,
    limited
  });
};
