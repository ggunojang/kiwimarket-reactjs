import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../components/FileUpload"; // FileUpload 컴포넌트를 import
import AlertModal from "../../components/modals/AlertModal";
import { createPost } from "../../api/board";

function Write() {
  const navigate = useNavigate();
  const { table } = useParams();

  const titleRef = useRef();
  const contentRef = useRef();
  const categoryRef = useRef(null);

  const [files, setFiles] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const MAX_FILES = 5; // 최대 파일 개수 설정

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 form 제출 로직을 추가하세요.

    try {
      const data = new URLSearchParams();
      data.append("category", categoryRef.current.value);
      data.append("title", titleRef.current.value);
      data.append("content", contentRef.current.value);

      // 파일 추가
      files.forEach((file, index) => {
        data.append(`file${index + 1}`, file);
      });

      const responseData = await createPost(data, table);
      console.log("responseData", responseData);

      if (responseData.status) {
        setModalMessage(responseData.message);
        console.log("create post successfully");
      } else {
        console.log("create post failed");
        console.log(responseData.errors);
        setModalMessage(responseData.errors);
      }
      setShowModal(true);
    } catch (error) {
      console.error("create post failed", error);
    }
  };

  return (
    <main className="mt-14 justify-center px-6 py-12 lg:px-8">
      {showModal && <AlertModal title="Notice" message={modalMessage} />}
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
                ref={categoryRef}
                defaultValue=""
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-8 text-gray-400 shadow-sm md:w-auto"
              >
                <option value="" disabled>
                  Please select a category
                </option>
                <option value="1">category1</option>
                <option value="2">category2</option>
                <option value="3">category3</option>
              </select>
            </div>
          </div>

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

          <FileUpload files={files} setFiles={setFiles} MAX_FILES={MAX_FILES} />

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

export default Write;
