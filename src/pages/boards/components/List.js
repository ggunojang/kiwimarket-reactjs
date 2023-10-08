import React, { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { BoardContext } from "../../../contexts/BoardContext";
import CategorySelect from "./CategorySelect";

const List = () => {
  const { table } = useParams();
  const navigate = useNavigate();
  //const { dispatch } = useContext(BoardContext);
  const {
    state,
    state: { currentPage, categoryData, pagerData, listData },
  } = useContext(BoardContext);


  const handlePageChange = (page) => {
    if (page !== currentPage) {
      //dispatch({ type: "SET_LIST", payload: null }); // 리스트 데이터 초기화 시키면 pageLoad를 불러들인다. 어떤게 좋을지 고민해
      navigate(`/${table}/list?page=${page}`);
    }
  };

  if (state) {
    const { list } = listData;
    return (
      <main className=" mt-10 justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Notice
          </h2>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
          <div className="my-5 flex w-full justify-end ">
            <CategorySelect
              categoryData={categoryData}
              seleteText="카테고리를 선택하세요."
            />
          </div>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
          <ul className="w-full divide-y divide-gray-100 border-t bg-white sm:px-0">
            <li className="flex justify-between gap-x-1 border-b border-slate-200 px-2 py-3 text-sm font-semibold">
              <div className="basis-1/12 text-center md:inline-block md:basis-1/12">
                번호
              </div>
              <div className="basis-11/12 text-center md:basis-10/12">제목</div>
              <div className="hidden shrink-0 justify-between text-center md:inline-block md:basis-1/12">
                이름
              </div>
            </li>
            <li>
              {list && list.length > 0 ? (
                list.map((value) => (
                  <ul key={value.post_id}>
                    <li className="flex justify-between gap-x-1 border-b border-slate-100 px-2 py-3">
                      <div className="w-10 basis-1/12 md:inline-block md:basis-1/12">
                        <p className="font-base text-center text-sm leading-6 text-gray-900">
                          {value.num}
                        </p>
                      </div>
                      <div className="basis-11/12 justify-start md:basis-10/12">
                        <p className="font-base text-sm leading-6 text-gray-900">
                          <span className="font-semibold">
                            [{value.bca_value}]
                          </span>{" "}
                          <Link to={`/${table}/post/${value.post_id}`}>
                            {value.post_title}
                          </Link>
                        </p>
                      </div>
                      <div className="hidden md:inline-block md:basis-1/12">
                        <p className="truncate text-center text-xs leading-5 text-gray-500">
                          {value.post_username}
                        </p>
                      </div>
                    </li>
                  </ul>
                ))
              ) : (
                <div>내용이 없습니다.</div>
              )}
            </li>
          </ul>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
          <div className="w-full divide-y divide-gray-100 sm:px-0">
            <Pagination
              currentPage={currentPage}
              perPage={pagerData.perPage}
              totalPage={pagerData.totalPage}
              totalRows={listData.total_rows}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex justify-end sm:px-0 md:px-10">
          <Link
            to={`/${table}/write`}
            className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post &gt;
          </Link>
        </div>
      </main>
    );
  }
};

export default List;
