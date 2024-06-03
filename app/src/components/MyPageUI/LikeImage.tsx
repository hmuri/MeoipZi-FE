import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

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
  cursor: pointer; /* Add cursor pointer to indicate clickability */
`;

const Container = styled.div`
  width: 33%; /* Set width to 1/3 of the viewport */
  float: left; /* Float left to align side by side */
`;

interface LikeImageProps {
  likedOutfits: string[]; // Define the images prop
}

const LikeImage: React.FC<LikeImageProps> = ({ likedOutfits }) => {
  const [images, setImages] = useState<string[]>([]); // State to hold the fetched image URLs
  const navigate = useNavigate();

  // Function to handle image click event
  const handleClick = (index: number) => {
    // Navigate to LikeImageList when the sixth image is clicked
    if (index === 5) {
      navigate("/outfits");
    }
  };

  return (
    <Container>
      <ImageGrid>
        {/* Render the fetched images */}
        {likedOutfits.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            onClick={() => handleClick(index)}
          />
        ))}
      </ImageGrid>
    </Container>
  );
};

export default LikeImage;
