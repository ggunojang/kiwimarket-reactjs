import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = process.env.REACT_APP_BASE_URL;

/**
 * 글등록
 */

export const createPost = async (data, table) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
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

          resolve(responseData);
        } catch (error) {
          reject(error);
        }
      }, 200); // 1몇 초  후에 API 요청을 실행합니다.
    });
};

export const updatePost = async (data, table, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/board/update/${table}/${id}`,
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
    }, 200); // 1몇 초  후에 API 요청을 실행합니다.
  });
};


export const deletePost = async (table, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = getAccessToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const { data: responseData } = await axios.post(
          `${url}/api/board/delete/${table}/${id}`,
          {}, // data 부분은 빈 객체로 전달하거나 생략할 수 있습니다.
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
        //console.log(responseData);
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
        //console.log(resolve(responseData));
      } catch (error) {
        reject(error);
      }
    }, 200); // 몇 초 후에 API 요청을 실행합니다.
  });
}