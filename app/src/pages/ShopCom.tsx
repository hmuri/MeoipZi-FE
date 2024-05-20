import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import ComLayout from "../components/CommunityLayout";
import axiosInstance from "../api/axios";

interface MainPageProps {
  currentPath: string; // Add currentPath prop
}

interface PostData {
  id: number;
  title: string;
  imgUrl: string;
  nickname: string;
  likesCount: string;
  commentsCount: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  title: string;
  imgUrl: string;
  heartCnt: number;
  commentCnt: number;
  createdAt: string;
}

const Wrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
  margin-top: 10%; // Adjust this value according to your design
`;

const ShopCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<string[][]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=shop&page=0&size=20`);
      const imageUrls = response.data.flat(); // Flatten the array of arrays
      const transformedPosts = imageUrls.map(transformPostData);
      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformPostData = (imgUrl: string): Post => {
    return {
      id: Date.now(), // Generate a unique id
      title: "Placeholder Title", // Add placeholder title
      imgUrl: imgUrl,
      heartCnt: 0, // Initialize likes count
      commentCnt: 0, // Initialize comments count
      createdAt: new Date().toISOString(), // Set current date as createdAt
    };
  };

  const handleItemClick = (post: Post) => {
    navigate(`ShopCommunity/post/${post.id}`);
  };

  return (
    <ComLayout currentPath={currentPath}>
      <Wrapper>
        <PostList posts={posts} onClickItem={handleItemClick} />
      </Wrapper>
    </ComLayout>
  );
};

export default ShopCom;
