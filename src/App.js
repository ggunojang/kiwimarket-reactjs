import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//import ProtectedComponent from "./Components/ProtectedComponent";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUpForm from "./Components/SignUpForm";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import UpdateProfile from "./Components/ModifyProfile";

/**
 * 사용자 프로파일을 별도로 저장을 해야합니다.!
 * useReducer 와 store를 별도 저장을 해서 profile에 내용을 저장하는 부분이 필요함!
 * 토큰은 로컬에 저장을 한다음에, 토큰값이 있으면 profile을 별도 저장을 한다.
 * 사용자정보를 페이지마다 계속 호출이 됨.
 */
function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const getAccessToken = () => {
    console.log(token);
    return token;
  };

  const setAccessToken = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  const removeAccessToken = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  return (
    <div className="App container mx-auto ">
      <BrowserRouter>
        <div className="flex-1 grid-flow-row flex-col justify-center">
          <Header getAccessToken={getAccessToken} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/logout"
              element={
                <Logout
                  getAccessToken={getAccessToken}
                  removeAccessToken={removeAccessToken}
                />
              }
            />
            <Route
              path="/login"
              element={<LoginForm setAccessToken={setAccessToken} />}
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/profile"
              element={<Profile getAccessToken={getAccessToken} />}
            />
            <Route
              path="/modify-profile"
              element={<UpdateProfile getAccessToken={getAccessToken} />}
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
