export const initialState = {
  market_id: 0,
  currentPage: 1,
  commentData: null,
  pagerData: null,
  newComments: false, //신규 등록시 다시 불러들임
};

export const marketCommentReducer = (state, action) => {
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
    case "NEW_COMMENTS_ADDED":
      return {
        ...state,
        newComments: true,
      };
    case "COMMENTS_FETCHED":
      return {
        ...state,
        newComments: false,
      };
    default:
      return state;
  }
};
