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
  return {
    type: actionTypes.loginFailed
  };
};

export const login = userInfo => {
  return dispatch => {
    dispatch(startLogin());
    loginRequest(userInfo)
      .then(loginRes => {
        if (loginRes.status === 200) {
          console.log("登录成功");
          dispatch(loginSuccess(loginRes.data.data));
        } else {
          console.log("");
          dispatch(loginFailed());
        }
      })
      .catch(err => {
        console.log(err, "登录err++++");
      });
  };
};
