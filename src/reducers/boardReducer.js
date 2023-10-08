export const initialState = {
  currentPage: 1,
  currentCategory: '',
  listData: null,
  categoryData: null,
  metaData: null,
  pagerData: null,
};

export const boardReducer = (state, action) => {
  switch (action.type) {
    case "SET_META":
      //console.log("SET_META", action.payload);
      return {
        ...state,
        metaData: action.payload,
      };
    case "SET_CATEGORY":
      //console.log("SET_CATEGORY", action.payload);
      return {
        ...state,
        categoryData: action.payload,
      };
    case "SET_LIST":
      //console.log("SET_LIST", action.payload);
      return {
        ...state,
        listData: action.payload,
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
    case "SET_CURRENT_CATEGORY":
      console.log("SET_CURRENT_CATEGORY", action.payload);
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      return state;
  }
};
