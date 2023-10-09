import React, { useContext, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import { getAccessToken } from "./utils/tokens";

import Header from "./pages/layouts/Header";
import Footer from "./pages/layouts/Footer";
import LoginForm from "./pages/auths/LoginForm";
import SignUpForm from "./pages/auths/SignUpForm";
import Logout from "./pages/auths/Logout";
import Home from "./pages/Home";
import Profile from "./pages/auths/Profile";
import UpdateProfile from "./pages/auths/ModifyProfile";
import ForgotPassword from "./pages/auths/ForgotPassword";
import Board from "./pages/boards/Board";
import Write from "./pages/boards/Write";
import Modify from "./pages/boards/Modify";
import Post from "./pages/boards/Post";
import ScrollToTop from "./components/ScrollToTop";

/**
 * 사용자 프로파일을 별도로 저장을 해야합니다.!
 * useReducer 와 store를 별도 저장을 해서 profile에 내용을 저장하는 부분이 필요함!
 * 토큰은 로컬에 저장을 한다음에, 토큰값이 있으면 profile을 별도 저장을 한다.
 * 사용자정보를 페이지마다 계속 호출이 됨.
 */
function App() {
  const { dispatch } = useContext(AuthContext); // useContext를 사용하여 dispatch 함수를 가져옵니다.

  useEffect(() => {
    const fetchUser = async () => {
      if (getAccessToken()) {
        const storedUser = localStorage.getItem("user");

        // storedUser의 값이 존재하는지 확인
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);

            // parsedUser가 객체이고, 키가 있는지 확인
            if (
              parsedUser &&
              typeof parsedUser === "object" &&
              Object.keys(parsedUser).length !== 0
            ) {
              dispatch({ type: "LOGIN", payload: parsedUser });
            }
          } catch (error) {
            console.error("Failed to parse stored user data", error);
          }
        }
      }
    };

    fetchUser();
  }, [dispatch]);


  return (
    <div className="App mx-auto w-full bg-gray-50">
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex-1 grid-flow-row flex-col justify-center">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 회원관리 */}
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgetpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/modify-profile" element={<UpdateProfile />} />
            {/* market 게시판 */}
            <Route path="/:table/list" element={<Board />} />
            <Route path="/:table/write" element={<Write />} />
            <Route path="/:table/modify/:id" element={<Modify />} />
            <Route path="/:table/post/:id" element={<Post />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
