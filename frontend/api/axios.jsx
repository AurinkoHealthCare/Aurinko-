// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // backend ka base URL
  withCredentials: true, // cookies ko allow karega
});

export default instance;
