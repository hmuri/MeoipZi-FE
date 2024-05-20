import React from "react";
import styled from "styled-components";
import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";

// Array of example images
const images = [TestImg1, TestImg2, TestImg3, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg];

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

// Component definition
const PostScrapsList: React.FC = () => {
  return (
    <ImageGrid>
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Image ${index}`} />
      ))}
    </ImageGrid>
  );
};

export default PostScrapsList;