import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/cards/Card";
import LoadPage from "../../components/LoadPage";
import { getCategory } from "../../api/board";

const people = [
  {
    id: 1,
    name: "Leslie Alexander",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 2,
    name: "Michael Foster",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 3,
    name: "Dries Vincent",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 4,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 5,
    name: "Michael Foster",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 6,
    name: "Dries Vincent",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 7,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 8,
    name: "Courtney Henry",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 9,
    name: "Tom Cook",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 10,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 11,
    name: "Courtney Henry",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 12,
    name: "Tom Cook",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 13,
    name: "Leslie Alexander",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 14,
    name: "Michael Foster",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 15,
    name: "Dries Vincent",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 16,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 17,
    name: "Michael Foster",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 18,
    name: "Dries Vincent",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 19,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 20,
    name: "Courtney Henry",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 21,
    name: "Tom Cook",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    id: 22,
    name: "Lindsay Walton",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 23,
    name: "Courtney Henry",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    id: 24,
    name: "Tom Cook",
    title:
      "A list of all the users in your account including their name, title, email and role.",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

function Cards() {
  const { table } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      setIsVisible(true);
      setUserData(people);
    }, 500); // 1000ms (1초) 후에 API 요청을 실행합니다.
  }, []);


  useEffect(() => {
    let isCancelled = false;

    const fetchCategory = async () => {
      try {
        const data = await getCategory(table);
        if (!isCancelled && data) {
          setCategoryData(data);
        }
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };

    fetchCategory();

    return () => {
      isCancelled = true;
    };
  }, [table]);



  if (userData === null && categoryData === null) {
    return <LoadPage pagetext="board" />;
  }
  if (userData !== null && categoryData !== null) {
    const {
      data: { category },
    } = categoryData;
    return (
      <main
        className={`lg:max-w-5lg ${
          isVisible ? "opacity-100" : "opacity-0"
        } mt-14 px-8 py-12 transition duration-1000 ease-in-out md:mx-auto md:max-w-3xl lg:w-full lg:px-0 xl:mx-auto xl:w-full xl:max-w-6xl`}
      >
        <div className="mb-10 md:mx-auto md:w-full md:max-w-xl">
          <h2 className="mt-5 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
            중고거래 매물
          </h2>
        </div>
        <div className="my-5 flex w-full justify-end ">
          <select
            id="category"
            defaultValue=""
            required
            className="block w-full rounded-md border border-gray-300 p-2.5 text-gray-400 shadow-sm sm:px-4 md:w-auto"
          >
            <option value="" disabled>
              지역을 선택하세요.
            </option>
            {category.map((item) => (
              <option value={item.bca_id} key={item.bca_id}>
                {item.margin > 0 ? "- " : ""}
                {item.bca_value}
              </option>
            ))}
          </select>
        </div>
        <ul className="mx-auto grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {userData.map((person, index) => (
            <li key={index}>
              <Card person={person} />
            </li>
          ))}
        </ul>
        <div className="mt-1 flex items-center justify-end border-t border-gray-900/10">
          <a
            href="/notice/write"
            className="mt-2 justify-center rounded-md px-3 py-1 text-sm font-semibold leading-6 tracking-tight text-black  hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Post &gt;
          </a>
        </div>
      </main>
    );
  }
}

export default Cards;
