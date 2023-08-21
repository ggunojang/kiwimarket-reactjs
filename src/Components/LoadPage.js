import React from "react";

function LoadPage({ pagetext }) {
  return (
    <div className="mt-10 md:mx-auto md:w-full md:max-w-2xl">
      <div className=" mb-20 grid grid-cols-1 gap-x-6 gap-y-10 space-y-12 sm:grid-cols-6">
        <div className="col-span-full text-center">
          <h2 className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            {pagetext} Page Loading ...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default LoadPage;
