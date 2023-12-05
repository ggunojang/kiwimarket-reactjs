import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import { MarketProvider } from "./contexts/MarketContext";
import { CommentProvider } from "./contexts/CommentContext";
import { MarketCommentProvider } from "./contexts/MarketCommentContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <AuthProvider>
    <BoardProvider>
      <MarketProvider>
        <MarketCommentProvider>
          <CommentProvider>
            <App />
          </CommentProvider>
        </MarketCommentProvider>
      </MarketProvider>
    </BoardProvider>
  </AuthProvider>,
  //</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
