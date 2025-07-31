// src/utils/axios.js
import axios from "axios";
import i18n from "../src/i18n"; // i18n ko import karo (path apke project ke hisaab se adjust karo)

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // backend ka base URL
  withCredentials: true, // cookies ko allow karega
});

// Request interceptor to add language param
instance.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  config.params.lang = i18n.language; // har request ke saath lang bhejo
  return config;
});

export default instance;
