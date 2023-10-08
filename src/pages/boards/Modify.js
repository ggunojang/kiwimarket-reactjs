import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../components/FileUpload"; // FileUpload 컴포넌트를 import
import AlertModal from "../../components/modals/AlertModal";
import LoadPage from "../../components/LoadPage";
import { updatePost, getPost } from "../../api/board";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modify = () => {
  const navigate = useNavigate();
  const { table, id } = useParams();

  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef(null);
  const [categoryData, setCategoryData] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [postData, setPostData] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const MAX_FILES = 5; // 최대 파일 개수 설정
  const listUrl = `/${table}/list`;

  useEffect(() => {
    let isCancelled = false;

    const fetchPost = async () => {
      try {
        const {
          data,
          data: {
            view: {
              category,
              post,
              board: { meta },
            },
          },
        } = await getPost(table, id);
        if (!isCancelled && data) {
          setPostData(post);
          setCategoryData(category);
          setConfigData(meta);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchPost();

    return () => {
      isCancelled = true;
    };
  }, [table, id]);

  
  const handleCheckboxChange = (id, isChecked) => {
    if (isChecked) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 form 제출 로직을 추가하세요.

    let data;

    try {
      if (files) {
        // 파일 추가
        data = new FormData();

        files.forEach((file, index) => {
          data.append(`post_file_update[${index}]`, file);
        });

        selectedIds.forEach((id) => {
          data.append("post_file_del[]", id);
        });

        data.append("post_category", categoryRef.current.value);
        data.append("post_title", titleRef.current.value);
        data.append("post_content", contentRef.current.value);

      } else {
        const { use_category } = configData;

        data = new URLSearchParams();
        if (use_category) {
          data.append("post_category", categoryRef.current.value);
        }

        selectedIds.forEach((id) => {
          data.append("post_file_del[]", id);
        });

        data.append("post_title", titleRef.current.value);
        data.append("post_content", contentRef.current.value);
      }

      const responseData = await updatePost(data, table, id);

      if (responseData.status) {
        setModalMessage(responseData.message);
      } else {
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
        alert("로그인을 해주세요!"); // 401 오류에 대한 메시지 설정
        navigate("/login");
      }
    }
  };

  if (postData === null) {
    return <LoadPage pagetext="post" />;
  }
  if (postData !== null) {
    const post_category = postData.post_category;
    const post_title = postData.post_title;
    const post_content = postData.post_content;
    const images = postData?.images?.list;
    const postDatetime = postData ? postData.post_datetime : "";
    const { use_category } = configData;

    return (
      <main className="mt-14 justify-center px-6 py-12 lg:px-8">
        {showModal && (
          <AlertModal
            title="Notice"
            message={modalMessage}
            status={status}
            listUrl={listUrl}
            onClose={() => setShowModal(false)}
          />
        )}
        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Modify
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
                    name="post_category"
                    ref={categoryRef}
                    defaultValue={post_category || ""}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 pr-8 text-gray-400 shadow-sm md:w-auto"
                  >
                    <option value="" disabled>
                      Please select a category
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
            )}

            <div className="col-span-full">
              <label
                htmlFor="post_title"
                className="block rounded-md text-sm font-medium leading-6 text-gray-900"
              >
                Subject
              </label>
              <div className="mt-2">
                <input
                  id="post_title"
                  name="title"
                  type="text"
                  ref={titleRef}
                  defaultValue={post_title}
                  placeholder="subject"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="post_content"
                className="block rounded-md text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="post_content"
                  name="content"
                  ref={contentRef}
                  defaultValue={post_content}
                  placeholder="content"
                  required
                  rows={8}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <FileUpload
              files={files}
              setFiles={setFiles}
              MAX_FILES={MAX_FILES}
            />
            <div className="col-span-full">
              
              <h4 className="block rounded-md text-sm font-medium leading-6 text-gray-900">Uploaded images</h4>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {images.length > 0 &&
                  images.map((file, index) => {
                    const objectURL = file.pfi_image;
                    return (
                      <div key={index} className="relative">
                        {file.pfi_type.startsWith("image/") && (
                          <img
                            src={objectURL}
                            alt={file.name}
                            className="w-full"
                          />
                        )}

                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckboxChange(
                                file.pfi_id,
                                e.target.checked,
                              )
                            }
                          />
                          <span className="pl-1 pt-1">삭제</span>
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>

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
};

export default Modify;
