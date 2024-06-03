import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";

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

interface LikeShortProps {
  sfs: string[]; // Define the images prop
}

// Component definition
const LikeShort: React.FC<LikeShortProps> = ({ sfs }) => {
  const [images, setImages] = useState<any[]>([]);


  return (
    <VideoGrid>
      {/* Render only the first two videos */}
      {sfs.slice(0, 2).map((image: any, index: number) => (
        <Video key={index} src={image} />
      ))}
    </VideoGrid>
  );
};

export default LikeShort;
