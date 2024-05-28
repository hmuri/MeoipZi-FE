import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LargeImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const VintageNewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Assuming you have a way to fetch the image URL based on the ID
  const imageUrl = `https://meoipzi.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20240514_232536546_${id}.jpg`;

  return (
    <ImageContainer>
      <LargeImage src={imageUrl} alt={`Vintage News ${id}`} />
    </ImageContainer>
  );
};

export default VintageNewsDetail;

