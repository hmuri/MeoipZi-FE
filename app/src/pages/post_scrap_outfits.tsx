import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import NavBar from "../components/NavBar";

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 100%;
  overflow-y: auto; /* Add overflow-y: auto; */
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

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 15px;
  margin: 8px;
`;

const ScrapOutfitsSeeAll: FC = () => {
  const [scrapData, setScrapData] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);

  const fetchData = async (page: number) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_BASE_URL}/mypage/posts/scraps/outfits?page=${page}`
      );
      setScrapData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  const handleNextPage = () => {
    setPageNum((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPageNum((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <Container>
      <Wrapper>
        <h2>스크랩한 Outfits</h2>
        <ScrollableContainer>
          <ImageGrid>
            {scrapData.map((outfit: any) => (
              <img
                key={outfit.id}
                src={outfit.imgUrl}
                alt={`Outfit ${outfit.id}`}
              />
            ))}
          </ImageGrid>
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
      </Wrapper>
    </Container>
  );
};

export default ScrapOutfitsSeeAll;
