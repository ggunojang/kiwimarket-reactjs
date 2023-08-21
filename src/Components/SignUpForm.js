import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpForm() {
  const navigate = useNavigate();

  const emailRef = useRef();
  const usernameRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

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

      console.log(data);

      const { data: responseData } = await axios.post(
        "http://localhost:8080/api/auth/register",
        data,
      );

      if (responseData.status) {
        console.log("sign in successfully");
      } else {
        console.log("sign in failed");
        console.log(responseData.errors);
      }
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="justify-center px-6 py-12 lg:px-8">
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

          <div className="col-span-full flex items-center justify-end gap-x-3  border-t border-gray-900/10 pt-10">
            <button
              type="button"
              className="rounded-md text-sm font-semibold leading-6 text-gray-900"
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
    </div>
  );
}
