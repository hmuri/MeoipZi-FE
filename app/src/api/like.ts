import axiosInstance from "./axios";

export const fetchLikedOutfits = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked images:", error);
    throw error;
  }
};

export const fetchLikedSFs = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked SFs:", error);
    throw error;
  }
};

export const fetchLikedComms = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liked comments:", error);
    throw error;
  }
};
