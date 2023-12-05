import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagesFileUpload from "../../components/ImagesFileUpload"; // ImagesFileUpload 컴포넌트를 import
import AlertModal from "../../components/modals/AlertModal";
import LoadPage from "../../components/LoadPage";
import { createMarketPost, getMarketCategory } from "../../api/market";

function Write() {
  const navigate = useNavigate();

  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef(null);
  const [categoryData, setCategoryData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [linkUrl, setLinkUrl] = useState(`/market/list`);

  const MAX_FILES = 5; // 최대 파일 개수 설정

  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const {
          data: { config, category },
        } = await getMarketCategory();

        if (!isCancelled && config) {
          setCategoryData(category);
          setConfigData(config);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 form 제출 로직을 추가하세요.

    let data;

    try {
      if (files) {
        // 파일 추가
        data = new FormData();

        files.forEach((file, index) => {
          data.append(`market_file[${index}]`, file);
        });

        data.append("market_category", categoryRef.current.value);
        data.append("market_title", titleRef.current.value);
        data.append("market_content", contentRef.current.value);
      } else {
        const { use_category } = configData;

        data = new URLSearchParams();
        if (use_category) {
          data.append("market_category", categoryRef.current.value);
        }
        data.append("market_title", titleRef.current.value);
        data.append("market_content", contentRef.current.value);
      }

      const responseData = await createMarketPost(data);
      console.log("responseData", responseData);

      if (responseData.status) {
        setModalMessage(responseData.message);
        console.log("create post successfully");
      } else {
        console.log("create post failed");
        console.log(responseData.message);
        setModalMessage(responseData.message);
      }
      setShowModal(true);
      setStatus(responseData.status);
    } catch (error) {
      console.error("create post failed", error);

      // 오류 처리
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "The access token is invalid."
      ) {
        setModalMessage("로그인을 해주세요!");
        setShowModal(true);
        setStatus(data.status);
        setLinkUrl("/login");
      }
    }
  };

  if (configData === null) {
    return <LoadPage pagetext="Write post" />;
  }
  if (configData !== null) {
    const { use_category } = configData;
    return (
      <main className="mt-14 justify-center px-6 py-12 lg:px-8">
        {showModal && (
          <AlertModal
            title="Notice"
            message={modalMessage}
            status={status}
            listUrl={linkUrl}
            onClose={() => setShowModal(false)}
          />
        )}
        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Write
          </h2>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-2xl ">
          <form
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 space-y-6 sm:grid-cols-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            {use_category && (
              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block rounded-md text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="market_category"
                    ref={categoryRef}
                    defaultValue=""
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 pr-8 text-gray-400 shadow-sm md:w-auto"
                  >
                    <option value="" disabled>
                      Please select a category
                    </option>
                    {categoryData.map((item) => (
                      <option value={item.mca_key} key={item.mca_key}>
                        {item.margin > 0 ? "- " : ""}
                        {item.mca_value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block rounded-md text-sm font-medium leading-6 text-gray-900"
              >
                Subject
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  ref={titleRef}
                  placeholder="subject"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block rounded-md text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  ref={contentRef}
                  placeholder="content"
                  required
                  rows={8}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <ImagesFileUpload
              files={files}
              setFiles={setFiles}
              MAX_FILES={MAX_FILES}
            />

            <div className="col-span-full flex items-center justify-end gap-x-3  border-gray-900/10">
              <button
                type="button"
                className="rounded-md text-sm font-semibold leading-6 text-gray-900"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default React.memo(Write);
