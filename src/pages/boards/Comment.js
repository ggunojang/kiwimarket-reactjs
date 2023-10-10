import React from 'react'
import CommentWrite from './components/CommentWrite';
import CommentList from './components/CommentList';
export const Comment = () => {
    return (
        <>
            <CommentList/>
            <CommentWrite />
      </>
    );
}

export default Comment;