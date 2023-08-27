// FileUpload.js
import React, { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FileUpload = ({ files, setFiles, MAX_FILES }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (files.length + droppedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="username"
        className="block rounded-md text-sm font-medium leading-6 text-gray-900"
      >
        Upload images
        <span className="ml-2 text-xs font-normal text-slate-400">
          (You can upload up to {MAX_FILES} images only.)
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
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          {files.length > 0 &&
            files.map((file, index) => {
              const objectURL = URL.createObjectURL(file);
              return (
                <div key={index} className="relative">
                  {file.type.startsWith("image/") && (
                    <img src={objectURL} alt={file.name} className="w-full" />
                  )}
                  <button
                    className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center bg-slate-700 p-1 text-xs text-white"
                    onClick={() => {
                      const newFiles = [...files];
                      newFiles.splice(index, 1);
                      setFiles(newFiles);
                    }}
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
