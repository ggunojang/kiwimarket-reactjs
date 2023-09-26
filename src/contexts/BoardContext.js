import React, { createContext, useReducer } from "react";
import { boardReducer, initialState } from "../reducers/boardReducer";

export const BoardContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
