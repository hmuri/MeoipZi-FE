import axiosInstance from "./axios";

// 검색하는 함수
export const getCategoryItems = async (category: string) => {
  try {
    const response = await axiosInstance.get(`/products/search/category/latest?category=${category}&page=0&size=20`);
    console.log('Data:', response.data);
    return response.data
  } catch (error) {
    console.error('Failed to fetch category items:', error);
  }
};
export const getBrandItems = async (category: string) => {
  try {
    const response = await axiosInstance.get(`/products/search/brand/latest?brand=${category}&page=0&size=20`);
    console.log('Data:', response.data);
    return response.data
  } catch (error) {
    console.error('Failed to fetch category items:', error);
  }
};
export const getGenreItems = async (category: string) => {
  try {
    const response = await axiosInstance.get(`/products/search/genre/latest?genre=${category}&page=0&size=20`);
    console.log('Data:', response.data);
    return response.data
  } catch (error) {
    console.error('Failed to fetch category items:', error);
  }
};

export {};