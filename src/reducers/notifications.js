import actionTypes from "../actions/actionTypes";

const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      title: "hfadsfhsh",
      desc: "1111;djfal;dfj;sdjf;sadjfasdjfas;dfj;asdfj;sadfj",
      hasRead: false
    },
    {
      id: 2,
      title: "hfadsfhsh",
      desc: "222222;djfal;dfj;sdjf;sadjfasdjfas;dfj;asdfj;sadfj",
      hasRead: false
    }
  ]
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.MAKE_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if (item.id === action.payload) {
          item.hasRead = true;
        }
        return item;
      });
      return {
        ...state,
        list: newList
      };
      break;
    case actionTypes.MAKE_ALL_AS_READ:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true;
          return item;
        })
      };
    case actionTypes.START_MAKE_AS_READ:
      return {
        ...state,
        isLoading: true
      };
      break;
    case actionTypes.FINISH_MAKE_AS_READ:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
      break;
  }
};
