import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import LikeImage from "../components/MyPageUI/LikeImage";
import NavBar from "../components/NavBar";

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

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 100%;
  overflow-y: auto; /* Add overflow-y: auto; */
`;

const LikeOutfitsSeeAll: FC = () => {
  const navigate = useNavigate();
  const [likedOutfits, setLikedOutfits] = useState<
    { id: number; imgUrl: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_BASE_URL}/mypage/likes/outfits`
        );
        const data = response.data;
        if (data && data.likedOutfits) {
          setLikedOutfits(data.likedOutfits);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <h2>Liked Outfits</h2>
        {likedOutfits.length > 0 ? (
          <LikeImage
            likedOutfits={likedOutfits.map((outfit) => outfit.imgUrl)}
          />
        ) : (
          <p>No liked outfits found.</p>
        )}
      </Wrapper>
    </Container>
  );
};

export default LikeOutfitsSeeAll;
