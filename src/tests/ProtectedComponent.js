// src/components/ProtectedComponent.js
import React, { useEffect } from "react";
import axios from "axios";

const ProtectedComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/get-users",
          { headers: headers },
        );

        console.log("Protected data:", response.data);
      } catch (error) {
        console.error("Failed to fetch protected data", error);
      }
    };

    fetchData();
  }, []);

  return <div>Protected Component</div>;
};

export default ProtectedComponent;
