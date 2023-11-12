import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../contexts/AuthContext";
import LoadPage from "../../components/LoadPage";
import ConfirmModal from "../../components/modals/ConfirmModal";

import { formatDate } from "../../utils/common";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [confirmShowModal, setConfirmShowModal] = useState(false);

  const url = process.env.REACT_APP_BASE_URL + "/assets/uploads/users";

  const {
    state: { isLogin, user },
  } = useContext(AuthContext);

  const handleClick = useCallback((e) => {
    e.preventDefault();

    setConfirmShowModal(true);
  }, []);

  useEffect(() => {
    setUserData(user); // useEffect 훅을 사용하여 user 값이 변경될 때만 setUserData 함수를 호출하도록 합니다.
  }, [user, userData, isLogin]);

  if (userData === null) {
    return <LoadPage pagetext="Profile" />;
  }
  if (userData !== null) {
    const { email, user, user_detail } = userData;
    return (
      <main className="mt-14 justify-center px-6 py-12 lg:px-8">
        {confirmShowModal && (
          <ConfirmModal
            title="Would you like to edit the information?"
            message='Would you like to edit the information? To cancel, press "Cancel". To confirm, press "Confirm" proceed to the next step.'
            onConfirm="true"
            onClose={() => setConfirmShowModal(false)}
            moveUrl="/modify-profile"
          />
        )}
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
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  User ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {user.username}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {email}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  First name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {user_detail.firstname}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {user_detail.lastname}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Joined at
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {formatDate("Y-m-d h:i:s", new Date(user.created_at.date))}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last Active
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {formatDate("Y-m-d h:i:s", new Date(user.last_active.date))}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Updated at
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {formatDate("Y-m-d h:i:s", new Date(user.updated_at.date))}
                </dd>
              </div>

              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Profile image
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
                  {user_detail.filename ? (
                    <img
                      src={`${url}/${user_detail.filename}`}
                      alt="Profile"
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
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
                <button
                  onClick={handleClick}
                  className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Modify Profile
                </button>
              </div>
            </dl>
          </div>
        </div>
      </main>
    );
  }
}

export default Profile;
