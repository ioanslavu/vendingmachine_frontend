import axios from "axios";
import Role from "../common/Roles";
import { API_URL, config } from "./config";

export const login = (username: string, password: string) =>
  axios
    .post(
      `${API_URL}/login`,
      {
        username,
        password,
      },
      config
    )
    .then((response) => response.data);

export const logoutAll = () =>
  axios.post(`${API_URL}/logout/all`, {}, config).then((response) => response.data);

export const logout = () =>
  axios.post(`${API_URL}/logout`, {}, config).then((response) => response.data);

export const register = (username: string, password: string, role: Role) =>
  axios
    .post(
      `${API_URL}/user`,
      {
        username,
        password,
        role,
      },
      config
    )
    .then((response) => response.data);

export const getCurrentUser = () =>
  axios
    .post(`${API_URL}/me`, {}, config)
    .then((response) => response.data)
    .catch((error) => (error.response ? error.response.data : error));
