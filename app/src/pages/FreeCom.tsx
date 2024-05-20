import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import Button from "../components/ui/Button_clicked";
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

const FWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;  // Fixed typo in 'align-items'
  justify-content: center;
  
  margin-bottom: 3vh;
`;


const FreeCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<PostData[]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=play&page=0&size=20`);
      const transformedPosts = response.data.map(transformPostData);
      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformPostData = (postData: PostData): Post => {
    return {
      id: postData.id,
      title: postData.title,
      imgUrl: postData.imgUrl,
      heartCnt: parseInt(postData.likesCount),
      commentCnt: parseInt(postData.commentsCount),
      createdAt: new Date(postData.createdAt).toISOString(),
    };
  };

  const handleItemClick = (post: Post) => {
    navigate(`FreeCommunity/post/${post.id}`);
  };

  return (
    <ComLayout currentPath={currentPath}>
      <FWrapper>
          <PostList posts={posts} onClickItem={handleItemClick} />
      </FWrapper>
    </ComLayout>
  );
};

export default FreeCom;