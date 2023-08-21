// src/components/ProtectedComponent.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ getAccessToken, removeAccessToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/logged-out",
          { headers: headers },
        );

        console.log("Protected data:", response.data);
      } catch (error) {
        console.error("Failed to fetch protected data", error);
      }
    };

    fetchData();
    removeAccessToken();
    navigate("/");
  }, [navigate, removeAccessToken, getAccessToken]);

  return <div>Logout ... </div>;
};

export default Logout;
