import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import LoadPage from "../../components/LoadPage";
import { truncateString } from "../../utils/common";
import { getPost } from "../../api/board";
import { BoardContext } from "../../contexts/BoardContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Post() {
  const navigate = useNavigate();
  const { id, table } = useParams();
  const [postData, setPostData] = useState(null);
  const {
    state: { currentPage },
  } = useContext(BoardContext);
/*
  useEffect(() => {
    setUserData(people);
  }, [id]);
*/
  
  useEffect(() => {
    let isCancelled = false;

    const fetchPost = async () => {
      try {
        const {
          data,
          data: {
            view: { post },
          },
        } = await getPost(table, id);



        console.log(data);
        

        if (!isCancelled && data) {
          setPostData(post);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchPost();

    return () => {
      isCancelled = true;
    };
  }, [table, id, currentPage]);


  if (postData === null) {
    return <LoadPage pagetext="post" />;
  }
  if (postData !== null) {

    console.log(postData.category);
    const name = truncateString(postData.post_nickname, 40);
    const email = truncateString(postData.post_email, 40);
    const list = postData?.images?.list;
    const bcaValue = postData && postData.category ? postData.category.bca_value : "";
    const postDatetime = postData ? postData.post_datetime : "";

    return (
      <main className="lg:max-w-5lg mt-20 px-8 py-12 md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-4xl">
        {list && list.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => ""} // console.log("slide change")}
            onSwiper={(swiper) => ""} // console.log(swiper)}
          >
            {list.map((value) => (
              <SwiperSlide key={value.pfi_id}>
                <img
                  className="mx-auto w-full rounded-3xl transition-all duration-150"
                  src={value.pfi_image}
                  alt={postData.post_title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <ul className="mx-auto mt-5 grid grid-cols-1">
          <li>{name}</li>
          <li>
            <span className="text-xs text-gray-400">{email}</span>
          </li>
        </ul>
        <ul className="mx-auto mt-5 grid grid-cols-1 gap-4 border-b border-t py-8">
          <li>
            <h2 className="text-xl font-bold tracking-tight ">
              {postData.post_title}
            </h2>
            <span className="text-xs text-gray-400">
              {bcaValue} - {postDatetime}
            </span>
          </li>
          <li className="text-lg font-semibold tracking-tight">
            $300 <span className="text-xs text-gray-400">NZD</span>
          </li>
          <li>
            <div
              className="text-sm font-normal leading-relaxed"
              dangerouslySetInnerHTML={{ __html: postData.post_content }}
            />
          </li>
          <li>
            <span className="text-xs text-gray-400">
              관심 {postData.post_like} ∙ 조회 {postData.post_hit}
            </span>
          </li>
        </ul>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/${table}/modify/${id}`)}
              className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Modify
            </button>
            <button
              onClick={() => navigate("/")}
              className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/${table}/list`)}
              className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              List
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Post;
