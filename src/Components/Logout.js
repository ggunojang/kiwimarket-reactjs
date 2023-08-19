// src/components/ProtectedComponent.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ removeAccessToken }) => {
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
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

  const handleLogout = () => {
    fetchData();
    removeAccessToken();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
