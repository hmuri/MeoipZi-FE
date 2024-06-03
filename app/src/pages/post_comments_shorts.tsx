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

const ShortFormGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr); /* 3 columns with equal width */
gap: 15px; /* Gap between grid items */
margin: 10px; /* Margin on top and bottom */
`;

const ShortFormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 200px;
`;

interface ShortForm {
  id: number;
  imgUrl: string;
  createAt: string;
}

const CommentsShortsSeeAll: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<ShortForm[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments/shortforms`);
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

  const handleItemClick = (shortForm: ShortForm) => { // Adjust parameter type
    navigate(`/post/${shortForm.id}`);
  };

  return (
    <Container>
      <Wrapper>
        <h2>댓글 남긴 숏폼</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : comments.length > 0 ? (
          <ShortFormGrid>
          {comments.map((shortForm) => (
            <ShortFormItem key={shortForm.id} >
              <Video controls>
                <source src={shortForm.imgUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </Video>
              <p>{new Date(shortForm.createAt).toLocaleDateString()}</p>
            </ShortFormItem>
          ))}
        </ShortFormGrid>
        ) : (
          <p>No posts found.</p>
        )}
      </Wrapper>
      <NavBar />
    </Container>
  );
};

export default CommentsShortsSeeAll;
