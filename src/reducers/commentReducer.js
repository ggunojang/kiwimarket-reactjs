export const initialState = {
  brd_id: 0,
  post_id: 0,
  currentPage: 1,
  commentData: null,
  pagerData: null,
};

export const commentReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      //console.log("SET_LIST", action.payload);
      return {
        ...state,
        commentData: action.payload,
      };
    case "SET_PAGER":
      //console.log("SET_PAGER", action.payload);
      return {
        ...state,
        pagerData: action.payload,
      };
    case "SET_CURRENT_PAGE":
      //console.log("SET_CURRENT_PAGE", action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};
