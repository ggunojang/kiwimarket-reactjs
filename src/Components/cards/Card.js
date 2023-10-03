import React from "react";
import { Link } from "react-router-dom";
import { truncateString } from "../../utils/common";

const Card = ({ person }) => {
  const name = truncateString(person.name, 20);
  const email = truncateString(person.email, 19);
  const id = person.id;
  return (
    <div className="group">
      <Link to={`/market/post/${id}`}>
        <div className="w-full overflow-hidden rounded-xl bg-slate-500">
          <img
            className="w-full transition-all duration-150 group-hover:scale-110"
            src={person.imageUrl}
            alt={person.title}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-nomal mb-1 tracking-tight text-gray-600">
            냉장고 팝니다.
          </div>
          <p className="mb-1 font-bold tracking-tight">
            $300 <span className="text-xs text-gray-400">NZD</span>
          </p>
          <p className="mt-1 text-sm tracking-tight text-gray-500">
            경기도 광주시 상동
          </p>
          <div className="mt-1 text-xs tracking-tight text-gray-400">
            관심 3 ∙ 조회 435
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
