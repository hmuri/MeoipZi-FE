import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

// Styled components for the image grid and individual images
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3 columns with 100px width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

const Image = styled.img`
  width: 100%; /* Image width */
  height: 100%; /* Image height */
`;

const Container = styled.div`
  width: 33%; /* Set width to 1/3 of the viewport */
  float: left; /* Float left to align side by side */
`;

const Button = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 3px;
  cursor: pointer;
`;

interface PostScrapProps {
  scrapData: any[]; // Define the scrapData prop
}

// Component definition
const PostScrap: React.FC<PostScrapProps> = ({ scrapData }) => {
  const navigate = useNavigate();
  const [scrapedOutfits, setScrapedOutfits] = useState<any[]>([]);
  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);

  return (
    <Container>
      <ImageGrid>
        {/* Render scrapedOutfits */}
        {scrapedOutfits.map((outfit: any, index: number) => (
          <Image key={index} src={outfit.imgUrl} alt={`Outfit ${index}`} />
        ))}
        {/* Render scrapedProducts */}
        {scrapedProducts.map((product: any, index: number) => (
          <Image key={index} src={product.imgUrl} alt={`Product ${index}`} />
        ))}
      </ImageGrid>
      <Button
        title="See More"
        onClick={() => {
          navigate("/products");
        }}
      />
    </Container>
  );
};

export default PostScrap;
