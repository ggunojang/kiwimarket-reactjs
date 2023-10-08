import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadPage from "../../components/LoadPage";
import { getList } from "../../api/board";
import { BoardContext } from "../../contexts/BoardContext";
import Gallery from "./components/Gallery";
import List from "./components/List";

const Board = () => {
  const { table } = useParams();
  const [allData, setAllData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const { dispatch } = useContext(BoardContext);
  const {
    state: { currentPage, currentCategory }
  } = useContext(BoardContext);

  
  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const setData = await getList(table, currentPage, currentCategory);
        // 데이터 호출
        if (!isCancelled && setData) {
          setAllData(setData);

          const {
            data: {
              view: { pager, category, board_meta, listData },
            },
          } = setData;

          dispatch({ type: "SET_LIST", payload: listData });

          // 페이지네이션
          dispatch({ type: "SET_PAGER", payload: pager });

          //카테고리
          dispatch({ type: "SET_CATEGORY", payload: category });

          //메타테그
          dispatch({ type: "SET_META", payload: board_meta });
          setMetaData(board_meta);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, [table, currentPage, currentCategory, dispatch]);
  
  if (!allData) {
    return <LoadPage pagetext={table} />;
  }


  if (metaData) {
    return metaData.use_gallery_list ? <Gallery /> : <List />;
  }
}

export default Board;