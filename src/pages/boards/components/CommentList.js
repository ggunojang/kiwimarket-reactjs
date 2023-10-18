import React, { useEffect, useContext } from "react";
import LoadPage from "../../../components/LoadPage";
import CommentPagination from "../../../components/CommentPagination";
import { CommentContext } from "../../../contexts/CommentContext";
import { getList } from "../../../api/comment";

export default function CommentList({brd_id = 0, post_id = 0}) {
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

    const fetchCategory = async () => {
      try {
        console.log("currentPage", currentPage);
        const data = await getList(brd_id, post_id, currentPage);

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

          console.log(pager);

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
    return <LoadPage pagetext="Comment" />;
  }


  if (commentData) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <h2 className="text-lg font-medium text-gray-900">Recent comments</h2>
          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <div className="flow-root">
              <div className="my-12 divide-y divide-gray-200">
                {commentData.list.map((comment) => (
                  <div key={comment.cmt_id} className="py-12">
                    <div className="flex items-center">
                      {/*<img
                        src={comment.avatarSrc}
                        alt={`${comment.author}.`}
                        className="h-12 w-12 rounded-full"
                /     >*/}
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-gray-900">
                          {comment.username}
                        </h4>
                      </div>
                    </div>

                    <div
                      className="mt-4 space-y-6 text-base italic text-gray-600"
                      dangerouslySetInnerHTML={{ __html: comment.cmt_content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

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
        </div>
      </div>
    );
  }
}
