import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";

// Array of example images
const images = [TestImg1, TestImg2, TestImg3, DefaultImg, DefaultImg, DefaultImg]; // Added DefaultImg multiple times to fill the grid

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

// Component definition
const LikeImage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    // Navigate to LikeImageList when the sixth image is clicked
    if (index === 5) {
      navigate("/outfits");
    }
  };

  return (
    <Container>
      <ImageGrid>
        {images.slice(0, 6).map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index}`}
            onClick={() => handleClick(index)} // Corrected the condition for handling click event
          />
        ))}
      </ImageGrid>
      
    </Container>
  );
};

export default LikeImage;
