import axios from "axios";
import i18n from "../src/i18n";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  config.params.lang = i18n.language; 
  return config;
});
export default instance;