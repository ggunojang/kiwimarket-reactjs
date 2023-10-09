/**
 * ImagesFileUpload.js
 * 파일 업로드도 할 수 있지만, 이미지 파일 업로드, 정렬 등은 별로도 컴포넌트를 두려고 한다.
 */
import React, { useRef, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { XMarkIcon } from "@heroicons/react/24/outline";


const ImagesFileUpload = ({
  files,
  setFiles,
  prevFilesed = [],
  deletedFileIds,
  setDeletedFileIds,
  MAX_FILES,
  MAX_FILE_SIZE_MB = 5,
}) => {
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
  // useState를 사용하여 삭제된 기존 파일의 ID들을 저장하는 상태를 추가합니다.

  // 초기 마운트 시 prevFilesed를 files 상태에 병합
  useEffect(() => {
    if (prevFilesed && prevFilesed.length > 0) {
      setFiles((prevFiles) => [...prevFilesed, ...prevFiles]);
    }
  }, [prevFilesed, setFiles]); 

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 파일 드롭
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (droppedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
      alert(`Some files exceed the size limit of ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    if (files.length + droppedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // 드롭존을 클릭하면, 파일찾기창 열기
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
      alert(`Some files exceed the size limit of ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    if (files.length + selectedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  //이미지 드레그 컴포넌트! 별도로 두었다. 추후 변경
  const DraggableImage = ({ file, index }) => {
    const [, dragRef] = useDrag({
      type: "IMAGE",
      item: { index },
    });

    const [, dropRef] = useDrop({
      accept: "IMAGE",
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          const newFiles = [...files];
          const [draggedFile] = newFiles.splice(draggedItem.index, 1);
          newFiles.splice(index, 0, draggedFile);
          setFiles(newFiles);
          draggedItem.index = index;
        }
      },
    });

    const isFileObject = file instanceof File;
    const objectURL = isFileObject ? URL.createObjectURL(file) : file.pfi_image;

    // X버튼 저장하기 핸들러
    const handleDelete = () => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);

      // 파일이 기존 파일인 경우 deletedFileIds에 ID를 추가합니다.
      if (!(file instanceof File)) {
        setDeletedFileIds((prevIds) => [...prevIds, file.pfi_id]);
      }
    };

    return (
      <div ref={(node) => dragRef(dropRef(node))} className="relative">
        <img
          src={objectURL}
          alt={isFileObject ? file.name : "Uploaded Image"}
          className="w-full"
        />
        <button
          className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center bg-slate-700 p-1 text-xs text-white"
          onClick={handleDelete}
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="col-span-full">
        <label
          htmlFor="username"
          className="block rounded-md text-sm font-medium leading-6 text-gray-900"
        >
          Upload images
          <span className="ml-2 text-xs font-normal text-slate-400">
            (You can upload a maximum of {MAX_FILES} images, each with a size
            limit of {MAX_FILE_SIZE_MB}MB.)
          </span>
        </label>
        <div className="mt-2">
          <div
            className="flex h-28 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 text-sm text-gray-400 shadow-sm"
            onClick={handleFileInputClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            Drag & Drop File Here or Click to Select
          </div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            accept="image/*"
          />
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            {files.length > 0 &&
              files.map((file, index) => (
                <DraggableImage key={index} file={file} index={index} />
              ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ImagesFileUpload;
