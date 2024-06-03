import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";

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
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await axiosInstance.get(`/meoipzi/${id}`);
        const data = response.data;
        // Assuming the response data contains the image URL
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageUrl();
  }, [id]);

  return (
    <ImageContainer>
      {imageUrl ? (
        <LargeImage src={imageUrl} alt={`Vintage News ${id}`} />
      ) : (
        <p>Loading...</p>
      )}
    </ImageContainer>
  );
};

export default VintageNewsDetail;
