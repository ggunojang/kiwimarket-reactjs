// src/components/ProtectedComponent.js
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // useContext를 사용하여 dispatch 함수를 가져옵니다.
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedOut) {
        try {
          const result = await logout();
          console.log("result", result);
          if (result) {
            setIsLoggedOut(true);

            dispatch({ type: "LOGOUT", payload: result });

            navigate("/");
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.log("Unauthorized. Please login again.");
            setIsLoggedOut(true);
            navigate("/login");
          } else {
            console.error("Failed to logout", error);
          }
        }
      }
    };
    fetchData();
  }, [navigate, isLoggedOut, dispatch]);

  return <div>Logout ... </div>;
};

export default Logout;
