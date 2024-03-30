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
const PostShortList: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    // Simulated fetch call to API endpoint (replace with your actual fetch call)
    const fetchData = async () => {
      try {
        // Simulated response data (replace with your actual API response)
        const response = await fetch("your_api_endpoint");
        const data = await response.json();
        setVideos(data.likedOutfitList); // Assuming "likedOutfitList" contains the video data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <VideoGrid>
      {videos.map((video: any) => (
        <Video key={video.id} controls poster={video.imgUrl}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      ))}
    </VideoGrid>
  );
};

export default PostShortList;
