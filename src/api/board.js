import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

/**
 * 글등록
 */

export const createPost = async (data, table) => {
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { data: responseData } = await axios.post(
    `${url}/api/board/insert/${table}`,
    data,
    {
      headers: headers,
    },
  );

  return responseData;
};

export const updatePost = async (data, table, id) => {
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { data: responseData } = await axios.post(
    `${url}/api/board/insert/${table}/${id}`,
    data,
    {
      headers: headers,
    },
  );

  return responseData;
};

export const getCategory = async (table) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/board/category/${table}`,
        );
        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 1몇 초  후에 API 요청을 실행합니다.
  });
}

export const getList = async (table, currentPage = 1, category = '') => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/board/list/${table}?page=${currentPage}&category=${category}`,
        );
        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 몇 초 후에 API 요청을 실행합니다.
  });
};

export const getPost = async (table, currentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/board/post/${table}/${currentId}`,
        );
        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 몇 초 후에 API 요청을 실행합니다.
  });
}