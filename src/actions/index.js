import actionTypes from "./actionTypes";

const startMakeAsRead = () => {
  return {
    type: actionTypes.START_MAKE_AS_READ
  };
};

const finishMakeAsRead = () => {
  return {
    type: actionTypes.FINISH_MAKE_AS_READ
  };
};

export const makeMessageAsRead = id => {
  console.log("id", id);
  return dispatch => {
    dispatch(startMakeAsRead());
    //模拟服务端请求
    setTimeout(() => {
      dispatch({ type: actionTypes.MAKE_AS_READ_BY_ID, payload: id });
      dispatch(finishMakeAsRead());
    }, 2000);
  };
};

export const makeAllAsRead = () => {
  return dispatch => {
    dispatch(startMakeAsRead());
    setTimeout(() => {
      dispatch({ type: actionTypes.MAKE_ALL_AS_READ });
      dispatch(finishMakeAsRead());
    }, 2000);
  };
};
