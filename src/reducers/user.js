import actionTypes from "../actions/actionTypes";
const isLogin =
  Boolean(localStorage.getItem("authToken")) ||
  Boolean(sessionStorage.getItem("authToken"));

const userInfo =
  JSON.parse(localStorage.getItem("userInfo")) ||
  JSON.parse(sessionStorage.getItem("userInfo"));
const initState = {
  ...userInfo,
  isLogin: isLogin,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payLoad,
        isLogin: true,
        isLoading: false
      };
    case actionTypes.LOGIN_FAILED:
      return {
        id: "",
        displayName: "",
        avatar: "",
        isLoading: false,
        isLogin: false,
        role: ""
      };
    case actionTypes.CHANG_AVATAR:
      return {
        ...state,
        avatar: action.payLoad
      };
    default:
      return state;
      break;
  }
};
