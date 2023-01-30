import axios from "axios";

export const transactionApi = axios.create({
  baseURL: import.meta.env.VITE_API,
});
