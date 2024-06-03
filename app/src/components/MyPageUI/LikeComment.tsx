import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Post } from "../list/types";
import PostList from "../../components/list/PostList";
import Button from "../ui/Button_clicked";

interface MainPageProps {
  comments: any[];
}

const SWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center; // Fixed typo in 'align-items'
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
`;


const LikeComments: React.FC<MainPageProps> = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch liked comments
    const fetchLikedComments = async () => {
      
    };

    fetchLikedComments();
  }, []);

  // Function to handle comment click event
  const handleClick = (comment: Post) => {
    // Navigate to CommentDetail when a comment is clicked
    navigate(`/comment/${comment.id}`);
  };

  return (
    <>
      <SWrapper>
        <Container>
          <PostList
            posts={posts} // Pass fetched posts to PostList component
            onClickItem={(item) => {
              navigate(`/post/${item.id}`);
            }}
          />
        </Container>
      </SWrapper>
    </>
  );
};

export default LikeComments;
