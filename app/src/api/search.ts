import axios from "axios";

// 검색 결과를 가져오는 함수
export const getSearchResult = async (keyword: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/item?keyword=${encodeURIComponent(
        keyword
      )}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("검색 결과를 가져오는데 실패했습니다.", error);
    throw error;
  }
};
