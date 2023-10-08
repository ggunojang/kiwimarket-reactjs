import React, { useContext } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { BoardContext } from "../../../contexts/BoardContext";
import Card from "../../../components/cards/Card";
import CategorySelect from "./CategorySelect";

const Gallery = () => {
  const { table } = useParams();
  const navigate = useNavigate();
  //const {dispatch} = useContext(BoardContext);
  const {
    state,
    state: { currentPage, categoryData, pagerData, listData },
  } = useContext(BoardContext);


  const handlePageChange = (page) => {
    if (page !== currentPage) {
      navigate(`/${table}/list?page=${page}`);
      //dispatch({ type: "SET_LIST", payload: null }); // 리스트 데이터 초기화 시키면 pageLoad를 불러들인다. 어떤게 좋을지 고민해
    }
  };

  if (state) {
    const { list } = listData;
    return (
      <main
        className={`lg:max-w-5lg mt-14 px-8 py-12 transition duration-1000 ease-in-out md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-6xl`}
      >
        <div className="mb-10 md:mx-auto md:w-full md:max-w-xl">
          <h2 className="mt-5 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
            중고거래 매물
          </h2>
        </div>
        <div className="my-5 flex w-full justify-end ">
          <CategorySelect categoryData={categoryData} seleteText="카테고리를 선택하세요." />
        </div>
        <ul className="mx-auto grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {list && list.length > 0 ? (
            list.map((value) => (
              <li key={value.post_id}>
                <Card data={value} />
              </li>
            ))
          ) : (
            <div>내용이 없습니다.</div>
          )}
        </ul>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-10">
          <Pagination
            currentPage={currentPage}
            perPage={pagerData.perPage}
            totalPage={pagerData.totalPage}
            totalRows={listData.total_rows}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="mx-auto flex justify-end">
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

export default Gallery;
