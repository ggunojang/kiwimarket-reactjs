import React from "react";
import CommentWrite from "./components/CommentWrite";
import CommentList from "./components/CommentList";
export const Comment = ({ market_id, user }) => {
  return (
    <>
      <CommentList market_id={market_id} />
      <CommentWrite market_id={market_id} user={user} />
    </>
  );
};

export default Comment;
