import axiosInstance from './axios';

// 사용자의 찜 목록 조회
// export const fetchWishItems = async (): Promise<WishListResponse> => {
//     const response = await axiosInstance.get('/item/wish');
//     return response.data;
//   };
  
//   // 상품 찜하기
//   export const addWishItem = async (itemId: number): Promise<WishActionResponse> => {
//     const response = await axiosInstance.post(`/item/wish/${itemId}`);
//     return response.data;
//   };
  
//   // 상품 찜해제
//   export const removeWishItem = async (itemId: number): Promise<WishActionResponse> => {
//     const response = await axiosInstance.delete(`/item/wish/${itemId}`);
//     return response.data;
//   };