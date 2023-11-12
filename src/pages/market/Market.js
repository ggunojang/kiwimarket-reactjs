import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadPage from "../../components/LoadPage";
import { getMarketList } from "../../api/market";
import { MarketContext } from "../../contexts/MarketContext";
import Gallery from "./components/Gallery";
import List from "./components/List";

const Market = () => {
  const { table } = useParams();
  const [allData, setAllData] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const { dispatch } = useContext(MarketContext);
  const {
    state: { currentPage, currentCategory },
  } = useContext(MarketContext);

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const setData = await getMarketList(table, currentPage, currentCategory);
        // 데이터 호출
        if (!isCancelled && setData) {
          const {
            data: {
              view: { pager, category, board_meta, listData },
            },
          } = setData;
          
          setAllData(setData);

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
};

export default Market;
