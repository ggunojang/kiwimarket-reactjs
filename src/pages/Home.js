import React, { useEffect, useState } from "react";
import Card from "../components/cards/Card";
import LoadPage from "../components/LoadPage";
import { getBoard } from "../api/main";

function Home() {
  const [marketData, setMarketData] = useState(null);
  const market_per_page = 12;

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const data = await getBoard('market', market_per_page);
        // 데이터 호출
        if (!isCancelled && data) {
          // 총데이터
          setMarketData(data);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (marketData === null) {
    return <LoadPage pagetext="market" />;
  }
  if (marketData !== null) {
    const {
      data: {
        view: { data },
      },
    } = marketData;

    const { list } = data;
    return (
      <main className=" lg:max-w-5lg mt-14 px-8 py-12 md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-5xl">
        <div className="mb-10 md:mx-auto md:w-full md:max-w-xl">
          <h2 className="mt-5 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
            중고거래 인기매물
          </h2>
        </div>

        <ul className="mx-auto grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {list && list.length > 0 ? (
            list.map((value) => (
              <li key={value.post_id}>
                <Card data={value} paramTable='market' />
              </li>
            ))
          ) : (
            <div>내용이 없습니다.</div>
          )}
        </ul>
      </main>
    );
  }
}

export default Home;
