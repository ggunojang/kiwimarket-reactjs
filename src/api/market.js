import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

/**
 * 글등록
 */

export const createMarketPost = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/market/insert`,
          data,
          {
            headers: headers,
          },
        );

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

export const updateMarketPost = async (data, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        //`${url}/api/market/update/${id}`,
        const { data: responseData } = await axios.post(
          `${url}/api/market/update/${id}`,
          data,
          {
            headers: headers,
          },
        );

        //console.log(responseData);

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

export const deleteMarketPost = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/market/delete/${id}`,
          {}, // data 부분은 빈 객체로 전달하거나 생략할 수 있습니다.
          {
            headers: headers,
          },
        );

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

export const getMarketCategory = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/market/category`,
        );
        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

export const getMarketList = async (currentPage = 1, category = "") => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/market/list?page=${currentPage}&category=${category}`,
        );
        resolve(responseData);
        //console.log(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 몇 초 후에 API 요청을 실행합니다.
  });
};

export const getMarketPost = async (currentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/market/post/${currentId}`,
        );
        resolve(responseData);
        //console.log(resolve(responseData));
      } catch (error) {
        reject(error);
      }
    }, 500); // 몇 초 후에 API 요청을 실행합니다.
  });
};
