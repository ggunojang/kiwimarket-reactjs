import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../../api/comment";
import { CommentContext } from "../../../contexts/CommentContext";

export const CommentWrite = ({brd_id=0, post_id=0}) => {
  const navigate = useNavigate();
  const commentRef = useRef();
  const { dispatch } = useContext(CommentContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 form 제출 로직을 추가하세요.

    let data;

    try {
      data = new URLSearchParams();
      data.append("cmt_content", commentRef.current.value);
      data.append("brd_id", brd_id);
      data.append("post_id", post_id);

      const responseData = await createComment(data, brd_id, post_id);
      console.log("responseData", responseData);

      if (responseData.status) {
        console.log("create comment successfully", responseData);
        // 댓글이 성공적으로 등록되면 commentRef 내용을 초기화
        commentRef.current.value = "";
        dispatch({ type: "NEW_COMMENTS_ADDED" });
      } else {
        console.log("create comment failed");
        console.log(responseData.message);
      }
    } catch (error) {
      console.error("create comment failed", error);

      // 오류 처리
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "The access token is invalid."
      ) {
        alert("로그인을 해주세요!");
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex w-full items-start space-x-4 px-6 py-10">
      <div className="flex flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={handleSubmit} method="POST" className="relative">
          <div className="overflow-hidden rounded-lg ">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={5}
              name="comment"
              id="comment"
              ref={commentRef}
              className="block w-full rounded-lg border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={""}
            />
          </div>

          <div className="inset-x-0 bottom-0 flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentWrite;
