import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import NavBar from "../components/NavBar";
import MyPageCommentList from "../components/list/MyPageComList";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 20vh 16px 16px; /* Adjust padding to create space at the top */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to flex-start */
  margin-bottom: 56px;
  overflow-y: auto;
  top: 0;
  position: sticky; /* Add position sticky */
  z-index: 0; /* Add z-index */
  height: 100vh; /* Set height to fill viewport height */
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 100%;
  overflow-y: auto; /* Add overflow-y: auto; */
  /* Set max-height to fill remaining viewport height */
`;

interface Comment {
  id: string;
  title: string;
  likesCount: number;
  cmtCount: number;
  createAt: string;
}

const CommentsCommunitySeeAll: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments/communities`
        );
        const data = response.data;
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setError("Unexpected response structure");
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (comments: Comment) => {
    navigate(`/post/${comments.id}`);
  };

  return (
    <Container>
      <Wrapper>
        <h2>댓글남긴 게시글</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : comments.length > 0 ? (
          <MyPageCommentList
            comments={comments}
            onClickItem={handleItemClick}
          />
        ) : (
          <p>No liked posts found.</p>
        )}
      </Wrapper>
    </Container>
  );
};

export default CommentsCommunitySeeAll;
