export const requestHeadersWithToken = async (accessToken) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

export const requestHeadersWithoutToken = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
