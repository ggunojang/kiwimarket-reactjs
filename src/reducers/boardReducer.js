export const initialState = {
  currentPage: 1,
};

export const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      console.log("SET_PAGE", action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
