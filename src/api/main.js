import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;


export const getBoard = async (table, per_page = 12) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const { data, data: responseData } = await axios.get(
          `${url}/api/main/board/${table}/${per_page}`,
        );
        resolve(responseData);
      } catch (error) {
        reject(error);
      }
    }, 200); // 몇 초 후에 API 요청을 실행합니다.
  });
};
