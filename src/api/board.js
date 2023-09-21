import axios from "axios";

import { getAccessToken } from "../utils/tokens";

const url = "http://localhost:8080";

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

  console.log(responseData);
  return responseData;
};
