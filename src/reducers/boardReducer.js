export const initialState = {
  isLogin: false,
  data: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "GETUSER":
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload, // user 필드를 액션의 payload로 업데이트합니다.
      };
    default:
      return state;
  }
};
