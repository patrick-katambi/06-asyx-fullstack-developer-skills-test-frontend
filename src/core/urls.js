const baseUrl = "http://localhost:8000";
// const baseUrl = 'http://127.0.0.1:8000'
const baseApiUrl = `${baseUrl}/api`;
const userApiUrl = `${baseApiUrl}/user`;

export const urls = {
  user: {
    register: `${userApiUrl}/register`,
    logout: `${userApiUrl}/logout`,
    login: `${userApiUrl}/login`,
  },
  groups: `${baseApiUrl}/groups`,
  categories: `${baseApiUrl}/categories`,
  resolution_codes: `${baseApiUrl}/resolution_codes`,
  impact: `${baseApiUrl}/impact`,
  priorities: `${baseApiUrl}/priorities`,
  state: `${baseApiUrl}/state`,
  ticket: {
    getAll: `${baseApiUrl}/tickets`,
    create: `${baseApiUrl}/tickets/create`,
  },
};
