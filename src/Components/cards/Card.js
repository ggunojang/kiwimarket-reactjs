import React from "react";
import { Link, useParams } from "react-router-dom";
import { truncateString } from "../../utils/common";

const Card = ({ data }) => {
  const { table } = useParams();
    const name = truncateString(data.post_nickname, 40);
    const email = truncateString(data.post_email, 40);
    const title = truncateString(data.post_title, 18);
  const id = data.post_id;
  return (
    <div className="group">
      <Link to={`/${table}/post/${id}`}>
        <div className="w-full overflow-hidden rounded-xl bg-slate-500">
          <img
            className="w-full transition-all duration-150 group-hover:scale-110"
            src={`http://localhost:8080/${data.thumb_url}`}
            alt={data.post_title}
          />
        </div>
        <div className="px-2 py-2">
          <div className="mb-1 text-sm font-normal tracking-tight text-gray-600 md:line-clamp-1 md:text-base">
            {title}
          </div>
          <p className="mb-1 font-bold tracking-tight">
            $300 <span className="text-xs text-gray-400">NZD</span>
          </p>
          <p className="mt-1 text-sm tracking-tight text-gray-500">
            {data.bca_value}
          </p>
          <div className="mt-1 text-xs tracking-tight text-gray-400">
            관심 {data.post_like} ∙ 조회 {data.post_hit}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
