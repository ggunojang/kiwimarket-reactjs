import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import LoadPage from "../../components/LoadPage";
import Pagination from "../../components/Pagination";
import { getList } from "../../api/board";
import { BoardContext } from "../../contexts/BoardContext";

const List = () => {
  const { table } = useParams();
  const navigate = useNavigate(); 
  const location = useLocation();
  const {
    state,
    state: { currentPage },
  } = useContext(BoardContext);
  const [listData, setListData] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const data = await getList(table, currentPage);

        // 데이터 호출
        if (!isCancelled && data) {
          // 총데이터
          setListData(data);

          // 페이지네이션
          const {
            data: {
              view: { pager },
            },
          } = data;
          setPerPage(pager.perPage);

          // 총게시물 갯수
          setTotalPage(pager.totalPage);

          //카테고리
          const {
            data: {
              view: { category },
            },
          } = data;
          setCategoryData(category);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, [table, currentPage]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setListData(null); // 리스트 데이터 초기화 시키면 pageLoad를 불러들인다. 어떤게 좋을지 고민해
      navigate(`/notice/list?page=${page}`);
    }
  };

  if (listData === null) {
    return <LoadPage pagetext="board" />;
  }
  if (listData !== null) {
    const {
      data: {
        view: { data },
      },
    } = listData;
    
    const { list, total_rows } = data;
    return (
      <main className=" mt-10 justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Notice
          </h2>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
          <div className="my-5 flex w-full justify-end ">
            <select
              id="category"
              defaultValue=""
              required
              className="block w-full rounded-md border border-gray-300 p-2 text-gray-400 shadow-sm sm:px-2 md:w-auto"
            >
              <option value="" disabled>
                지역을 선택하세요.
              </option>
              {categoryData.map((item) => (
                <option value={item.bca_id} key={item.bca_id}>
                  {item.margin > 0 ? "- " : ""}
                  {item.bca_value}
                </option>
              ))}
            </select>
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
              perPage={perPage}
              totalPage={totalPage}
              totalRows={total_rows}
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
}

export default List;