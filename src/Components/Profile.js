import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadPage from "./LoadPage";

function Profile({ getAccessToken }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        setLoading(true);
        const {
          data: { status, user },
        } = await axios.get("http://localhost:8080/api/auth/user-info", {
          headers: headers,
        });
        setUserData(user);
        if (status === "true") setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [getAccessToken]);

  if (!loading) {
    return <LoadPage pagetext="Profile" />;
  }

  if (userData !== null) {
    const { user, email, user_detail } = userData;

    return (
      <div className="justify-center px-6 py-12 lg:px-8">
        <div className=" md:mx-auto md:w-full md:max-w-2xl">
          <h2 className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-2xl">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 space-y-6 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2 block w-full border-0 py-1.5 text-sm text-gray-600">
                {user.username}
              </div>
            </div>

            <div className="col-span-full mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 block w-full border-0 py-1.5 text-sm text-gray-600">
                {email}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2 block w-full border-0 py-1.5 text-sm text-gray-600">
                {user_detail.firstname}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2 block w-full border-0 py-1.5 text-sm text-gray-600">
                {user_detail.lastname}
              </div>
            </div>

            <div className="col-span-full flex items-center justify-end gap-x-3  border-t border-gray-900/10 pt-10">
              <a
                href="/modify-profile"
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Modify Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
