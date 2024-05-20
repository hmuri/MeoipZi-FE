import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";

import { fetchLikedOutfits } from "../../api/like";
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
`;


// Component definition
const LikeImageList: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes/outfits?page={pageNum}`);
        setImages(response.data.likedOutfits); // Update state with fetched image data
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageGrid>
      {images.map((image, index) => (
        <Image key={index} src={image} alt={`Image ${index}`} />
      ))}
    </ImageGrid>
  );
};

export default LikeImageList;

