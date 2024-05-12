import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  cursor: pointer; /* Add cursor pointer to indicate clickability */
`;

const Container = styled.div`
  width: 33%; /* Set width to 1/3 of the viewport */
  float: left; /* Float left to align side by side */
`;

const LikeImage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // State to hold the fetched image URLs
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated fetch call to API endpoint (replace with your actual fetch call)
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_BASE_URL}/mypage/likes`
        );
        setImages(response.data.likedOutfits); // Update state with fetched image data
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);

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
        {images.map((imageUrl, index) => (
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
