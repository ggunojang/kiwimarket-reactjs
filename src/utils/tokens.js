export const getAccessToken = () => {
  const token = localStorage.getItem("access_token");
  return token ? token : "";
};

export const setAccessToken = (newToken) => {
  localStorage.setItem("access_token", newToken);
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};
