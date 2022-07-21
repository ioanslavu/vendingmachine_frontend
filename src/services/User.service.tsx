import axios from "axios";
import { API_URL, config } from "./config";

export const resetBalance = () =>
  axios.post(`${API_URL}/reset`, {}, config).then((response) => response.data);

export const deposit = (amount: number) =>
  axios.post(`${API_URL}/deposit`, { amount }, config).then((response) => response.data);
