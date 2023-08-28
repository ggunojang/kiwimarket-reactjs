import React, { useEffect, useState } from "react";
import LoadPage from "../../components/LoadPage";
import { truncateString } from "../../utils/common";

const people = {
  name: "Leslie Alexander",
  title:
    "A list of all the users in your account including their name, title, email and role.",
  email: "leslie.alexander@example.com",
  role: "Co-Founder / CEO",
  imageUrl:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  lastSeen: "3h ago",
  lastSeenDateTime: "2023-01-23T13:23Z",
};
function Post() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(people);
  }, []);

  if (userData === null) {
    return <LoadPage pagetext="board" />;
  }
  if (userData !== null) {
    const name = truncateString(userData.name, 40);
    const email = truncateString(userData.email, 40);
    return (
      <main className="lg:max-w-5lg mt-20 px-8 py-12 md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-4xl">
        <div>
          <img
            className="mx-auto w-full rounded-3xl transition-all duration-150"
            src={userData.imageUrl}
            alt={userData.title}
          />
        </div>
        <ul className="mx-auto mt-5 grid grid-cols-1">
          <li>{name}</li>
          <li>
            <span className="text-xs text-gray-400">{email}</span>
          </li>
        </ul>
        <ul className="mx-auto mt-5 grid grid-cols-1 gap-4 border-b border-t py-8">
          <li>
            <h2 className="text-xl font-semibold tracking-tight">
              {userData.title}
            </h2>
            <span className="text-xs text-gray-400">생활가전 - 1일전</span>
          </li>
          <li className="text-lg font-semibold tracking-tight">
            $300 <span className="text-xs text-gray-400">NZD</span>
          </li>
          <li>{userData.role}</li>
          <li>
            <span className="text-xs text-gray-400">관심 3 ∙ 조회 300</span>
          </li>
        </ul>
        <div className="mt-1 flex items-center justify-end">
          <a
            href="/board/list"
            className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            List >
          </a>
        </div>
      </main>
    );
  }
}

export default Post;
