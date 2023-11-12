import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import { truncateString } from "../../utils/common";
import { getMarketPost, deleteMarketPost } from "../../api/market";
import { MarketContext } from "../../contexts/MarketContext";
import { AuthContext } from "../../contexts/AuthContext";

import ConfirmModal from "../../components/modals/ConfirmModal";
import AlertModal from "../../components/modals/AlertModal";
import LoadPage from "../../components/LoadPage";

import Comment from "./Comment";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const storedUser = localStorage.getItem("user");
  const [postData, setPostData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [usersDetail, setUsersDetail] = useState(null);
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [linkUrl, setLinkUrl] = useState(`/market/list`);

  const url = process.env.REACT_APP_BASE_URL + "/assets/uploads/users";

  const {
    state: { currentPage },
  } = useContext(MarketContext);

  const {
    state: { isLogin, user },
  } = useContext(AuthContext);

  useEffect(() => {
    let isCancelled = false;

    const fetchPost = async () => {
      try {
        const {
          data,
          data: {
            view: { post, market, users_detail },
          },
        } = await getMarketPost(id);

        //console.log("post", data);

        if (!isCancelled && data) {
          setPostData(post);
          setMarketData(market);
          setUsersDetail(users_detail);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchPost();

    return () => {
      isCancelled = true;
    };
  }, [id, currentPage]);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const responseData = await deleteMarketPost(id);
      if (responseData.status) {
        setModalMessage(responseData.message);
      } else {
        setModalMessage(responseData.message);
      }
      setShowModal(true);
      setStatus(responseData.status);
    } catch (error) {
      const {
        response: { data },
      } = error;
      // 오류 처리
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "The access token is invalid."
      ) {
        //alert("로그인을 해주세요!"); // 401 오류에 대한 메시지 설정
        setModalMessage("로그인을 해주세요!");
        setShowModal(true);
        setStatus(data.status);
        setLinkUrl("/login");
      }
    }
  };

  if (postData === null) {
    return <LoadPage pagetext="post" />;
  }
  if (postData !== null) {
    const name = truncateString(postData.market_nickname, 40);
    const email = truncateString(postData.market_email, 40);
    const list = postData?.images?.list;
    const bcaValue =
      postData && postData.category ? postData.category.bca_value : "";
    console.log("bcaValue", postData);
    const postDatetime = postData ? postData.market_datetime : "";
    const brd_id = marketData.brd_id;
    const market_id = postData.market_id;
    return (
      <main className="lg:max-w-5lg mt-20 px-8 py-12 md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-4xl">
        {showModal && (
          <AlertModal
            title="Notice"
            message={modalMessage}
            status={status}
            listUrl={linkUrl}
            onClose={() => setShowModal(false)}
          />
        )}
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
                  alt={postData.market_title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <ul className="mx-auto mt-5 flex items-center font-bold">
          <li className="mr-5">
            {usersDetail.filename ? (
              <img
                src={`${url}/${usersDetail.filename}`}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <UserCircleIcon
                className="h-10 w-10 text-gray-300"
                aria-hidden="true"
              />
            )}
          </li>
          <div>
            <li>{name}</li>
          </div>
        </ul>
        <ul className="mx-auto mt-5 grid grid-cols-1 gap-4 border-b border-t py-8">
          <li>
            <h2 className="text-xl font-bold tracking-tight ">
              {postData.market_title}
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
              dangerouslySetInnerHTML={{ __html: postData.market_content }}
            />
          </li>
          <li>
            <span className="text-xs text-gray-400">
              조회 {postData.market_hit} ∙ 댓글 {postData.market_comment_count} ∙
              관심 {postData.market_like}
            </span>
          </li>
        </ul>

        <div className="w-full">
          <Comment brd_id={brd_id} market_id={market_id} user={user} />
        </div>

        <div className="mt-1 flex items-center justify-between border-t">
          <div className="flex items-center">
            {storedUser && (
              <div>
                <button
                  onClick={() => navigate(`/market/modify/${id}`)}
                  className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Modify
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete
                </button>
                {isDeleteModalOpen && (
                  <ConfirmModal
                    title="Delete Confirmation"
                    message="Are you sure you want to delete this post?"
                    onConfirm={handleConfirmDelete}
                    onClose={handleCloseModal}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate(`/market/list`)}
              className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
