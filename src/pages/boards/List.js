import React, {  useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadPage from "../../components/LoadPage";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Pagination from "../../components/Pagination";
import { getList } from "../../api/board";

const List = () => {
  const { table } = useParams();
  const [listData, setListData] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const data = await getList(table);
        if (!isCancelled && data) {
          setListData(data);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, [table]);

  if (listData === null) {
    return <LoadPage pagetext="board" />;
  }
  if (listData !== null) {
    const {
      data: { view: { data } },
    } = listData;
    const {list, total_rows} = data;
    console.log(list, total_rows);
    return (
      <main className="mt-10 justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Notice
          </h2>
        </div>

        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto flex sm:px-0 md:px-10">
          <ul className="w-full divide-y divide-gray-100 bg-white sm:px-0 md:px-1">
            <li className="flex justify-between gap-x-1 px-5 py-3 text-sm font-semibold md:px-5 ">
              <div className="basis-1/12 text-center">번호</div>
              <div className="basis-10/12 text-center">제목</div>
              <div className="shrink-0 basis-1/12 justify-between text-center">
                이름
              </div>
            </li>
            {list.map((value) => (
              <ul key={value.post_id}>
                <li className="flex justify-between gap-x-4 px-5 py-3 md:px-5 ">
                  <div className="w-10 basis-1/12">
                    <p className="font-base text-center text-sm leading-6 text-gray-900">
                      {value.num}
                    </p>
                  </div>
                  <div className="basis-10/12 justify-start">
                    <p className="font-base text-sm leading-6 text-gray-900">
                      {value.post_title}
                    </p>
                  </div>
                  <div className="basis-1/12">
                    <p className="text-center truncate text-xs leading-5 text-gray-500">
                      {value.post_username}
                    </p>
                  </div>
                </li>
              </ul>
            ))}
            {/**listData.map((person) => (
              <li
                key={person.email}
                className="flex justify-between gap-x-10 px-5 py-5 hover:bg-gray-50 md:px-5"
              >
                <div className="flex min-w-0 gap-x-1">
                  <div className="min-w-0 flex-auto">
                    <p className="font-base text-sm leading-6 text-gray-900">
                      {person.title}
                    </p>
                    <p className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
                      {person.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-x-5">
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.role}
                    </p>
                    {person.lastSeen ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Last seen{" "}
                        <time dateTime={person.lastSeenDateTime}>
                          {person.lastSeen}
                        </time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <ChevronRightIcon
                      className="h-4 w-4 font-bold text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </li>
                    ))**/}
          </ul>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto ">
          <div className="w-full sm:px-0 md:px-10">
            <Pagination />
          </div>
        </div>
        <div className="container inset-x-0 top-0 z-50 row-span-1 mx-auto text-right">
          <a
            href="/notice/write"
            className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post &gt;
          </a>
        </div>
      </main>
    );
  }
}

export default List;