import React from "react";
import { Link, useParams } from "react-router-dom";
import { truncateString } from "../../utils/common";

const Card = ({ data, paramTable = "market" }) => {
  const url = process.env.REACT_APP_BASE_URL;
  const { table } = useParams();
  const currentTable = table ? table : paramTable;
  const name = truncateString(data.market_nickname, 40);
  const email = truncateString(data.market_email, 40);
  const title = truncateString(data.market_title, 18);
  const id = data.market_id;
  return (
    <div className="group">
      <Link to={`/${currentTable}/post/${id}`}>
        <div className="w-full overflow-hidden rounded-xl bg-slate-500">
          <img
            className="w-full transition-all duration-150 group-hover:scale-110"
            src={`${url}/${data.thumb_url}`}
            alt={data.market_title}
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
            조회 {data.market_hit} ∙ 댓글 {data.market_comment_count} ∙ 관심{" "}
            {data.market_like}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
