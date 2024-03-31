import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components for the video grid and individual videos
const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3 columns with 100px width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

const Video = styled.video`
  width: 100px; /* Video preview width */
  height: 170px; /* Video preview height */
`;

// Component definition
const LikeShort: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    // Simulated fetch call to API endpoint (replace with your actual fetch call)
    const fetchData = async () => {
      try {
        // Simulated response data (replace with your actual API response)
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes`);
        const data = await response.json();
        setImages(data.likedSFs); // Update state with fetched image data
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <VideoGrid>
      {/* Render only the first two videos */}
      {images.slice(0, 2).map((image: any, index: number) => (
        <Video key={index} src={image.imgUrl} />
        ))}
      </VideoGrid>
  );
};

export default LikeShort;
