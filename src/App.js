import React, { useState } from "react";
import LoginForm from "./Components/LoginForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//import ProtectedComponent from "./Components/ProtectedComponent";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUpForm from "./Components/SignUpForm";
import Logout from "./Components/Logout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

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
          <Header />
          <Routes>
            {token ? (
              //{<ProtectedComponent />}
              <Route
                path="/logout"
                element={<Logout removeAccessToken={removeAccessToken} />}
              />
            ) : (
              <>
                <Route
                  path="/login"
                  element={<LoginForm setAccessToken={setAccessToken} />}
                />
                <Route path="/signup" element={<SignUpForm />} />
              </>
            )}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
