import React, { useEffect, useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import LoadPage from "../../../components/LoadPage";
import CommentPagination from "../../../components/CommentPagination";
import { CommentContext } from "../../../contexts/CommentContext";
import { getList } from "../../../api/comment";
import { formatDate } from "../../../utils/common";

export default function CommentList({ brd_id = 0, post_id = 0 }) {
  const url = process.env.REACT_APP_BASE_URL + "/assets/uploads/users";
  const { dispatch } = useContext(CommentContext);
  const {
    state: { commentData, currentPage, pagerData, newComments },
  } = useContext(CommentContext);
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: page });
    }
  };

  useEffect(() => {
    let isCancelled = false;

    dispatch({ type: "SET_LIST", payload: null }); // commentData를 null로 초기화
    dispatch({ type: "SET_PAGER", payload: null }); // pagerData를 null로 초기화
    //dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }); // currentPage를 1로 초기화

    const fetchCategory = async () => {
      try {
        //console.log("currentPage", currentPage);
        const data = await getList(brd_id, post_id, currentPage);
        //console.log("data", data);
        // 데이터 호출
        if (!isCancelled && data) {
          const {
            data: {
              view: { listData },
            },
          } = data;

          // 총데이터
          dispatch({ type: "SET_LIST", payload: listData });

          // 페이지네이션
          const {
            data: {
              view: { pager },
            },
          } = data;

          // 페이지네이션
          dispatch({ type: "SET_PAGER", payload: pager });
          dispatch({ type: "COMMENTS_FETCHED" });
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, [currentPage, brd_id, post_id, dispatch, newComments]);

  if (!commentData) {
    return <LoadPage pagetext="Comment" margin="py-12" />;
  }

  if (commentData) {
    return (
      <div>
        <div className="mx-auto max-w-2xl px-2 py-5 sm:px-3 sm:py-5 lg:max-w-7xl lg:px-3">
          <h2 className="text-lg font-medium text-gray-900">Recent comments</h2>
          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <div className="flow-root">
              <div className="my-3 divide-y divide-gray-200">
                {commentData.list.map((comment) => (
                  <div key={comment.cmt_id} className="py-8">
                    <div className="flex items-center">
                      {comment.filename ? (
                        <img
                          src={`${url}/${comment.filename}`}
                          alt="Profile"
                          className="inline-block h-10 w-10 rounded-full"
                        />
                      ) : (
                        <UserCircleIcon
                          className="inline-block h-10 w-10 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-gray-900">
                          {comment.username}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {comment.cmt_datetime}
                        </span>
                      </div>
                    </div>
                    <div
                      className="mt-4 space-y-6 whitespace-pre-wrap text-sm font-normal leading-relaxed text-gray-500"
                      dangerouslySetInnerHTML={{ __html: comment.cmt_content }}
                    />
                  </div>
                ))}
                {commentData.list.length === 0 && (
                  <div className="flex items-center text-gray-400">
                    내용이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

          {pagerData.perPage === 0 && (
            <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
              <div className="w-full divide-y divide-gray-100 sm:px-0">
                <CommentPagination
                  currentPage={currentPage}
                  perPage={pagerData.perPage}
                  totalPage={pagerData.totalPage}
                  totalRows={commentData.total_rows}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

