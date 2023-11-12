import React from "react";

function LoadPage({ pagetext, margin = "h-screen" }) {
  return (
    <div className={`flex ${margin} items-center justify-center`}>
      <div className="text-center">
        <h2 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900">
          {pagetext} Page Loading ...
        </h2>
      </div>
    </div>
  );
}

export default LoadPage;
