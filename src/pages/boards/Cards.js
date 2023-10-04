import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import LoadPage from "../../components/LoadPage";
import Pagination from "../../components/Pagination";
import { getList } from "../../api/board";
import { BoardContext } from "../../contexts/BoardContext";
import Card from "../../components/cards/Card";

const Cards = () => {
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
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async (category = "") => {
      try {
        const data = await getList(table, currentPage, category);

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

    fetchCategory( selectedCategory);

    return () => {
      isCancelled = true;
    };
  }, [table, currentPage, selectedCategory]);

  
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setListData(null); // 리스트 데이터 초기화 시키면 pageLoad를 불러들인다. 어떤게 좋을지 고민해
      navigate(`/${table}/list?page=${page}`);
    }
  };

  if (listData === null) {
    return <LoadPage pagetext="Market" />;
  }
  if (listData !== null) {
    const {
      data: {
        view: { data },
      },
    } = listData;

    const { list, total_rows } = data;
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
          <select
            id="category"
            defaultValue=""
            required
            className="block w-full rounded-md border border-gray-300 p-2.5 text-gray-400 shadow-sm sm:px-4 md:w-auto"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option disabled>
              지역을 선택하세요.
            </option>
            <option value="">
              전체
            </option>
            {categoryData.map((item) => (
              <option value={item.bca_key} key={item.bca_id}>
                {item.margin > 0 ? "- " : ""}
                {item.bca_value}
              </option>
            ))}
          </select>
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
            perPage={perPage}
            totalPage={totalPage}
            totalRows={total_rows}
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
}

export default Cards;
