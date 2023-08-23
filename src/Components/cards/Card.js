import React from "react";

const Card = ({ title, description, image }) => {
  return (
    <div className=" max-w-sm overflow-hidden rounded bg-white shadow-lg">
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
