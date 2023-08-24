import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LoadPage from "../../components/LoadPage";
import ConfirmModal from "../../components/modals/ConfirmModal";
import AlertModal from "../../components/modals/AlertModal";
import { getUser, modifyUser } from "../../api/auth";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // useContext를 사용하여 dispatch 함수를 가져옵니다.
  const [showModal, setShowModal] = useState(false);
  const [confirmShowModal, setConfirmShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const emailRef = useRef();
  const usernameRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [userData, setUserData] = useState(null);

  const {
    state: { isLogin, user },
  } = useContext(AuthContext);

  useEffect(() => {
    setUserData(user); // useEffect 훅을 사용하여 user 값이 변경될 때만 setUserData 함수를 호출하도록 합니다.
    console.log(isLogin);
  }, [user, isLogin]);

  const handleConfirm = useCallback(async () => {
    try {
      const data = new URLSearchParams();
      data.append("username", usernameRef.current.value);
      data.append("email", emailRef.current.value);
      data.append("firstname", firstnameRef.current.value);
      data.append("lastname", lastnameRef.current.value);
      data.append("password", passwordRef.current.value);
      data.append("passconf", passwordConfirmRef.current.value);

      const responseData = await modifyUser(data);

      if (responseData.status) {
        setModalMessage("updated successfully");

        const user = await getUser();
        localStorage.setItem("user", JSON.stringify(user));

        // AuthContext의 상태를 업데이트합니다.
        dispatch({ type: "UPDATE_USER", payload: user });
      } else {
        setModalMessage(responseData.errors);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  }, [dispatch]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setConfirmShowModal(true);
  }, []);

  if (!isLogin) {
    return <LoadPage pagetext="Modify Profile" />;
  }

  if (isLogin && userData !== null) {
    const { email, user, user_detail } = userData;
    return (
      <div className="justify-center px-6 py-12 lg:px-8">
        {confirmShowModal && (
          <ConfirmModal
            title="Would you like to edit the information?"
            message='Would you like to edit the information? To cancel, press "Cancel". To confirm, press "Confirm" proceed to the next step.'
            onConfirm={handleConfirm}
            onClose={() => setConfirmShowModal(false)}
          />
        )}
        {showModal && <AlertModal title={modalMessage} />}
        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <h2 className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            Modify Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-10 md:mx-auto md:w-full md:max-w-2xl">
          <form
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 space-y-1 sm:grid-cols-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="col-span-full border-t border-teal-100 pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  ref={usernameRef}
                  placeholder="user ID"
                  defaultValue={user.username}
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full  pt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  placeholder="email address"
                  defaultValue={email}
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full my-0 space-y-0 py-0"></div>

            <div className="sm:col-span-3">
              <label
                htmlFor="firstname"
                className="block rounded-md text-sm font-medium  text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  ref={firstnameRef}
                  placeholder="firstname"
                  defaultValue={user_detail.firstname}
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="border-t border-teal-100 sm:hidden sm:border-hidden md:col-span-full"></div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastname"
                className="block rounded-md text-sm font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  ref={lastnameRef}
                  placeholder="lastname"
                  defaultValue={user_detail.lastname}
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full pt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="inputPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="inputPassword"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  placeholder="password"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className=" col-span-full pt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="inputConfirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password Confirm
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="inputConfirmPassword"
                  name="password_confirm"
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="password confirm"
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
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
                type="submit"
                className="justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default UpdateProfile;
