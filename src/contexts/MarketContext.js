import React, { createContext, useReducer } from "react";
import { marketReducer, initialState } from "../reducers/marketReducer";

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketReducer, initialState);
  return (
    <MarketContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketContext.Provider>
  );
};
