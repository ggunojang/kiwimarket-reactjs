import React from "react";
import { truncateString } from "../../utils/common";

const Card = ({ person }) => {
  const name = truncateString(person.name, 20);
  const email = truncateString(person.email, 19);
  return (
    <div className="group">
      <a href="/board/post">
        <div className="h-32 w-full overflow-hidden rounded-lg bg-slate-500 sm:h-44 md:h-36 xl:h-52">
          <img
            className="w-full transition-all duration-150 group-hover:scale-110"
            src={person.imageUrl}
            alt={person.title}
          />
        </div>
        <div className="px-2 py-2">
          <div className="font-bold">{name}</div>
          <p className="mt-1 text-sm text-gray-500">{email}</p>
        </div>
      </a>
    </div>
  );
};

export default Card;
