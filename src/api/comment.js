import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

//등록
export const createComment = async (data, brd_id, post_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/board/comment_insert/${brd_id}/${post_id}`,
          data,
          {
            headers: headers,
          },
        );

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

//수정
export const updateComment = async (data, brd_id, post_id, cmt_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/board/comment_update/${brd_id}/${post_id}/${cmt_id}`,
          data,
          {
            headers: headers,
          },
        );

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

// 삭제
export const deleteComment = async (brd_id, post_id, cmt_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/board/comment_delete/${brd_id}/${post_id}/${cmt_id}`,
          {},
          {
            headers: headers,
          },
        );

        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 1몇 초  후에 API 요청을 실행합니다.
  });
};

// 리스트
export const getList = async (brd_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data: responseData } = await axios.get(
          `${url}/api/board/comment/${brd_id}`,
        );
        resolve(responseData);
        //console.log(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 몇 초 후에 API 요청을 실행합니다.
  });
};