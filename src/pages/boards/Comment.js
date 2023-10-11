import React from 'react'
import CommentWrite from './components/CommentWrite';
import CommentList from './components/CommentList';
export const Comment = ({brd_id, post_id}) => {
    return (
      <>
        <CommentList brd_id={brd_id} post_id={post_id} />
        <CommentWrite brd_id={brd_id} post_id={post_id} />
      </>
    );
}

export default Comment;