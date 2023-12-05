import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

//등록
export const createComment = async (data, market_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/market/comment_insert/${market_id}`,
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

//수정
export const updateComment = async (data, market_id, mct_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/market/comment_update/${market_id}/${mct_id}`,
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

// 삭제
export const deleteComment = async (market_id, mct_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/market/comment_delete/${market_id}/${mct_id}`,
          {},
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

// 리스트
export const getList = async (market_id, currentPage = 1) => {
  console.log();
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/market/comment/${market_id}?page=${currentPage}`,
        );
        resolve(responseData);
        //console.log(responseData);
      } catch (error) {
        reject(error);
      }
    }, 500); // 몇 초 후에 API 요청을 실행합니다.
  });
};
