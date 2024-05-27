import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../api/axios";

interface Post {
  id: number;
  title?: string;
  imgUrl: string;
  content?: string;
  category?: string;
  createdAt?: string;
  likesCount?: number;
  cmtCount?: number;
}


const SWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 355px;
  height: 100%;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
  flex: 1;
  margin-right:20vh;
  margin-left: 10vh;
`;

const VideoContainer = styled.video`
  width: 100%;
  height: auto;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 columns with equal width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

interface PostFeedProps {
  uploadedCommList: Post[];
  uploadedSFList: Post[];
}

const PostFeed: FC<PostFeedProps> = ({ uploadedCommList, uploadedSFList }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]); // State to store posts

  useEffect(() => {
    if (uploadedSFList && uploadedSFList.length > 0) {
      setPosts(uploadedSFList);
    }
  }, [uploadedSFList]);

  const handleClick = (postId: number) => {
    // Handle click event, e.g., navigate to post details page
    navigate(`/post/${postId}`);
  };

  return (
    <SWrapper>
      <Container>
        <ImageGrid>
          {posts.map((post) => (
            <div key={post.id} onClick={() => handleClick(post.id)}>
              {post.imgUrl.endsWith(".mp4") ? (
                // Render video content if URL ends with .mp4
                <VideoContainer controls>
                  <source src={post.imgUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </VideoContainer>
              ) : (
                // Render text content if URL does not end with .mp4
                <>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </>
              )}
            </div>
          ))}
        </ImageGrid>
      </Container>
    </SWrapper>
  );
};

export default PostFeed;