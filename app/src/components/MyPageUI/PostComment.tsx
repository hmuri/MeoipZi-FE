import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // Import Axios

import PostList from "../../components/list/PostList";
import Button from "../ui/Button_clicked";

import CommunityTab from "../../components/CommunityTab";

interface MainPageProps {}

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

const PostComment: FC<MainPageProps> = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // State to store posts

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get("your_api_endpoint_here")
      .then(response => {
        setPosts(response.data); // Set fetched posts into state
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []); // Empty dependency array to fetch data only once on component mount

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

export default PostComment;