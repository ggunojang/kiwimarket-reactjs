import axios from "axios";
import { parseUserAgent } from "../utils/common";

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

/**
 * 로그인
 */
export const login = async (email, password) => {
  const params = new URLSearchParams();
  const deviceInfo = JSON.stringify(parseUserAgent());

  params.append("email", email);
  params.append("password", password);
  params.append("device", deviceInfo);

  try {
    const { data } = await axios.post(`${url}/api/auth/user-login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    setAccessToken(data.token);

    if (getAccessToken()) {
      const user = await getUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token is invalid or expired");
      removeAccessToken();
      return false;
    } else {
      throw error;
    }
  }
};

/**
 * 로그아웃
 */
export const logout = async () => {
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (token) {
    try {
      const {
        data: { status, message },
      } = await axios.get(`${url}/api/auth/logged-out`, {
        headers: headers,
      });
      console.log(status, message);

      if (status) {
        removeAccessToken();
        return status;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Token is invalid or expired");
        removeAccessToken();
        return false;
      } else {
        throw error;
      }
    }
  } else {
    return false;
  }
};

/**
 * 회원정보 호출
 */
export const getUser = async () => {
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${url}/api/auth/user-info`, {
      headers: headers,
    });
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token is invalid or expired");
      removeAccessToken();
      return false;
    } else {
      throw error;
    }
  }
};

/**
 * 회원가입
 */

export const registerUser = async (data) => {
  const { data: status } = await axios.post(`${url}/api/auth/register`, data);
  console.log(status);
  return status;
};

/**
 * 회원정보 수정
 */

export const modifyUser = async (data) => {
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data: responseData } = await axios.post(
    `${url}/api/auth/modify`,
    data,
    {
      headers: headers,
    },
  );

  return responseData;
};

/**
 * 비밀번호 찾기
 */

export const findPassword = async (data) => {
  const { data: status } = await axios.post(
    `${url}/api/auth/findpassword`,
    data,
  );
  console.log(status);
  return status;
};
