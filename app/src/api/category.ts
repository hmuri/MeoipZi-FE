import axios from "axios";
import axiosInstance from "./axios";

// 검색 결과를 가져오는 함수
export const getCategoryItems = async (categoryId: number) => {
  try {
    const response = await axiosInstance.get(`/outfits/${categoryId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("검색 결과를 가져오는데 실패했습니다.", error);
    throw error;
  }
};
