import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { findPassword } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // useContext를 사용하여 dispatch 함수를 가져옵니다.

  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = emailRef.current.value;
      const data = await findPassword(email);

      if (data) {
        console.log("Logged in successfully");

        dispatch({ type: "LOGIN", payload: data });

        navigate("/");
      }
    } catch (error) {
      alert("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <main className="mt-14 justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Find to your password
        </h2>
      </div>

      <div className="mt-10 md:mx-auto md:w-full md:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
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
                placeholder="email address"
                ref={emailRef}
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send to email
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
};

export default ForgetPassword;
