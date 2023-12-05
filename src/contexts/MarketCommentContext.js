import React, { createContext, useReducer } from "react";
import { marketCommentReducer, initialState } from "../reducers/marketCommentReducer";

export const MarketCommentContext = createContext();

export const MarketCommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketCommentReducer, initialState);
  return (
    <MarketCommentContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketCommentContext.Provider>
  );
};
