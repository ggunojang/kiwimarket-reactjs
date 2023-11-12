import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";


import { registerUser } from "../../api/auth";
import AlertModal from "../../components/modals/AlertModal";

export default function SignUpForm() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const usernameRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new URLSearchParams();
      data.append("username", usernameRef.current.value);
      data.append("email", emailRef.current.value);
      data.append("firstname", firstnameRef.current.value);
      data.append("lastname", lastnameRef.current.value);
      data.append("password", passwordRef.current.value);
      data.append("passconf", passwordConfirmRef.current.value);
      data.append("userphoto", fileInputRef.current.value);

      console.log("data", data);

      const responseData = await registerUser(data);
      console.log("responseData", responseData);

      if (responseData.status) {
        setModalMessage(responseData.message);
        console.log("sign in successfully");
      } else {
        console.log("sign in failed");
        console.log(responseData.errors);
        setModalMessage(responseData.errors);
      }
      setShowModal(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <main className="mt-14 justify-center px-6 py-12 lg:px-8">
      {showModal && (
        <AlertModal title="Register message" message={modalMessage} />
      )}
      <div className="md:mx-auto md:w-full md:max-w-2xl">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register to your account
        </h2>
      </div>

      <div className="mt-10 md:mx-auto md:w-full md:max-w-2xl">
        <form
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 space-y-6 sm:grid-cols-6"
          onSubmit={handleSubmit}
          method="POST"
        >
          <div className="col-span-full">
            <label
              htmlFor="username"
              className="block rounded-md text-sm font-medium leading-6 text-gray-900"
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
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
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
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="firstname"
              className="block rounded-md text-sm font-medium leading-6 text-gray-900"
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
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="lastname"
              className="block rounded-md text-sm font-medium leading-6 text-gray-900"
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
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
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
                placeholder="Password"
                autoComplete="new-password"
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
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
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="my-0 border-t border-teal-100 py-0 md:col-span-full"></div>

          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => fileInputRef.current.click()}
              >
                Change
              </button>
              <span class="text-sm text-gray-500">{imageName}</span>
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
              className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
