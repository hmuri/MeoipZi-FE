import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import LikeImage from "../components/MyPageUI/LikeImage";
import NavBar from "../components/NavBar";
import LikeShort from "../components/MyPageUI/LikeShort";

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 126px;
  margin-bottom: 56px;
`;

const ScrollableContainer = styled.div`
  width: 90%;
  max-width: 375px;
  overflow-y: auto;
`;

const PaginationButton = styled.button`
  margin: 10px;
  padding: 5px 10px;
  font-size: 14px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 100%;
  overflow-y: auto; /* Add overflow-y: auto; */
`;

const LikeShortssSeeAll: FC = () => {
  const [likedShortForms, setLikedShortForms] = useState<
    { id: number; imgUrl: string; createdAt: string }[]
  >([]);
  const [pageNum, setPageNum] = useState(1);

  const fetchLikedShortForms = async (page: number) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_BASE_URL}/mypage/likes/shortforms?page=${page}`
      );
      const data = response.data;
      if (data && data.likedShortForms) {
        setLikedShortForms(data.likedShortForms);
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLikedShortForms(pageNum);
  }, [pageNum]);

  const handleNextPage = () => {
    setPageNum((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPageNum((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <Container>
      <ScrollableContainer>
        <Wrapper>
          <h2>Liked Shorts</h2>
          {likedShortForms.length > 0 ? (
            <LikeShort sfs={likedShortForms.map((sf) => sf.imgUrl)} />
          ) : (
            <p>No liked short forms found.</p>
          )}
        </Wrapper>
        <div>
          <PaginationButton
            onClick={handlePreviousPage}
            disabled={pageNum === 1}
          >
            Previous
          </PaginationButton>
          <PaginationButton onClick={handleNextPage}>Next</PaginationButton>
        </div>
      </ScrollableContainer>
    </Container>
  );
};

export default LikeShortssSeeAll;
