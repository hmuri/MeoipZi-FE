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

// Component definition
const PostShort: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds/shortforms`);
        setVideos(response.data); // Assuming response.data contains the video data
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <VideoGrid>
      {/* Render only the first two videos */}
      {videos.slice(0, 2).map((video: any) => (
        <Video key={video.id} controls poster={video.imgUrl}>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      ))}
    </VideoGrid>
  );
};

export default PostShort;
