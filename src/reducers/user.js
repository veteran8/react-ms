import actionTypes from "../actions/actionTypes";

const initState = {
  id: "",
  displayName: "",
  avatar: "",
  role: "",
  isLogin: false,
  isLoading: false
};
export default (state = initState, action) => {
  console.log(action, "action");
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payLoad.userInfo,
        isLogin: true,
        isLoading: false
      };
    case actionTypes.LOGIN_FAILED:
      return initState;
    default:
      return state;
      break;
  }
};
