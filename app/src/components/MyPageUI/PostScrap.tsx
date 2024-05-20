
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";

// Array of example images
const images = [TestImg1, TestImg2, TestImg3, DefaultImg, DefaultImg];

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

// Component definition
const PostScrap: React.FC = () => {
    const navigate = useNavigate();
  return (
    <Container>
      <ImageGrid>
        {images.slice(0, 5).map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index}`} />
        ))}
      </ImageGrid>
      <Button
        title="See More"
        onClick ={() => {
            navigate("/products");
        }}
        />
    </Container>
  );
};

export default PostScrap;