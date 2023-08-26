import React from "react";
import { truncateString } from "../../utils/common";

const Card = ({ person }) => {
  const name = truncateString(person.name, 20);
  const email = truncateString(person.email, 19);
  return (
    <>
      <div className="w-full overflow-hidden rounded-lg bg-slate-500">
        <img className="w-full" src={person.imageUrl} alt={person.title} />
      </div>
      <div className="px-2 py-2">
        <div className="font-bold">{name}</div>
        <p className="mt-1 text-sm text-gray-500">{email}</p>
      </div>
    </>
  );
};

export default Card;
