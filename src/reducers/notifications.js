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
      hasRead: true
    }
  ]
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
      break;
  }
};
