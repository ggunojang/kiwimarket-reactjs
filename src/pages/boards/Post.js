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
      <main className="px-8 py-12 md:mx-auto md:w-full md:max-w-5xl">
        <div className="mb-10 md:mx-auto md:w-full md:max-w-xl">
          <h2 className="mt-5 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Post
          </h2>
        </div>
        <ul className="mx-auto grid grid-cols-1 gap-4 border-t border-gray-900/10 pt-5 ">
          <li>{userData.title}</li>
          <li>
            <img
              className="mx-auto w-full transition-all duration-150 sm:w-2/3 md:w-2/3"
              src={userData.imageUrl}
              alt={userData.title}
            />
          </li>
          <li>{name}</li>
          <li>{email}</li>
        </ul>
        <div className="mt-3 flex items-center justify-end border-t border-gray-900/10">
          <a
            href="/board/list"
            className="mt-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            List
          </a>
        </div>
      </main>
    );
  }
}

export default Post;
