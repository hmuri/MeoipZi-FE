import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // Import Axios

import PostList from "../../components/list/PostList";
import Button from "../ui/Button_clicked";

import CommunityTab from "../../components/CommunityTab";
import axiosInstance from "../../api/axios";

interface Post {
  id: number;
  outfitId?: number;
  commId?: number;
  userId: string;
  nickname: string;
  createdAt: string;
  contents: string;
  title: string;      // Add missing properties
  heartCnt: number;   // Add missing properties
  commentCnt: number; // Add missing properties
  postDate: string;   // Add missing properties
}


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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [shortFormResponse, outfitResponse, communityResponse] = await Promise.all([
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds/comments-shortform`),
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds/comments-outfit`),
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds/comments-community`)
        ]);

        const shortFormPosts: Post[] = shortFormResponse.data.cmtsCommList;
        const outfitPosts: Post[] = outfitResponse.data.cmtsCommList;
        const communityPosts: Post[] = communityResponse.data.cmtsCommList;

        // Concatenate posts from all responses
        const allPosts: Post[] = [...shortFormPosts, ...outfitPosts, ...communityPosts];
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);// Empty dependency array to fetch data only once on component mount

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