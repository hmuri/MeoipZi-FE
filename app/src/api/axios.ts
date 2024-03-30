// axiosInstance.js 파일
import axios from "axios";
import Cookies from "js-cookie";
import { reissueTokens } from "./auth"; // API 호출 함수 import

const API_BASE_URL = "https://hearo-server.shop:8080";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(async (config) => {
  let accessToken = Cookies.get("accessToken");

  // Optional: 액세스 토큰 만료 여부 확인 후 토큰 갱신 로직 구현
  // 여기서는 단순화를 위해 모든 요청에 대해 액세스 토큰을 설정합니다.
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(response => response, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const data = await reissueTokens(); // 토큰 갱신 시도
    if (data.inSuccess && data.result) {
      originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;

      Cookies.set("accessToken", data.result.accessToken, { secure: true, sameSite: "Strict" });
      Cookies.set("refreshToken", data.result.refreshToken, { secure: true, sameSite: "Strict" });
      
      return axiosInstance(originalRequest); // 갱신된 토큰으로 요청 재시도
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;