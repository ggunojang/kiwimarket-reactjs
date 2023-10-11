import React, { createContext, useReducer } from "react";
import { commentReducer, initialState } from "../reducers/commentReducer";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  return (
    <CommentContext.Provider value={{ state, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};
