import axiosInstance from "./axios"; // axios 인스턴스 가져오기

// 상품 정보를 가져오는 함수
export const getItem = async (itemId: number) => {
  const response = await axiosInstance.get(`/outfits/${itemId}`);
  return response.data;
};

export const getProductItem = async (itemId: number) => {
  const response = await axiosInstance.get(`/products/${itemId}`);
  return response.data;
};

export const getShort = async () => {
  const response = await axiosInstance.get(
    `/shortforms/popular?page=0&size=20`
  );
  return response.data;
};

export const getItemReviews = async (itemId: string | undefined) => {
  const response = await axiosInstance.get(`/review/${itemId}`);
  return response.data;
};

export const getItemAllReviews = async (itemId: string | undefined) => {
  const response = await axiosInstance.get(`/review/${itemId}/list`);
  return response.data;
};
