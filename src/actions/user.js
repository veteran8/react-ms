import actionTypes from "./actionTypes";
import { loginRequest } from "../request";

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  };
};

const loginSuccess = userInfo => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payLoad: userInfo
  };
};

const loginFailed = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userInfo");
  return {
    type: actionTypes.LOGIN_FAILED
  };
};

export const login = userInfo => {
  return dispatch => {
    dispatch(startLogin());
    loginRequest(userInfo)
      .then(loginRes => {
        let authToken = loginRes.data.data.authToken;
        if (loginRes.status === 200) {
          if (userInfo.remember === true) {
            localStorage.setItem("authToken", authToken);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(loginRes.data.data)
            );
          } else {
            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(loginRes.data.data)
            );
          }
          dispatch(loginSuccess(loginRes.data.data));
        } else {
          dispatch(loginFailed());
        }
      })
      .catch(err => {});
  };
};

export const logout = () => {
  return dispatch => {
    //模拟退出登出
    dispatch(loginFailed());
  };
};
