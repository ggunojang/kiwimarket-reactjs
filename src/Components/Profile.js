import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadPage from "./LoadPage";

function Profile({ getAccessToken }) {
  const navigate = useNavigate();
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

        <div className="mt-5 md:mx-auto md:w-full md:max-w-2xl">
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  User ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.username}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {email}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  First name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user_detail.firstname}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user_detail.lastname}
                </dd>
              </div>
              <div className="col-span-full flex items-center justify-end gap-x-3  border-t border-gray-900/10 pt-10">
                <button
                  type="button"
                  className="rounded-md text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <a
                  href="/modify-profile"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Modify Profile
                </a>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
