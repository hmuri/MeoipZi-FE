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

const BWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
  margin-top: 10%; // Adjust this value according to your design
`;

const BrandCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch image URLs
      const imageResponse = await axiosInstance.get<string[][]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=brand&page=0&size=20`);
      const imageUrls = imageResponse.data;

      // Fetch post data
      const postResponse = await axiosInstance.get<PostData[]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=brand&page=0&size=20`);
      const postData = postResponse.data;

      // Combine post data with image URLs
      const transformedPosts = postData.map((post, index) => transformPostData(post, imageUrls[index]));
      setPosts(transformedPosts);
      console.log(transformedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformPostData = (postData: PostData, imgUrls: string[]): Post => {
    let postDateISOString = '';
    if (Date.parse(postData.createdAt)) {
      postDateISOString = new Date(postData.createdAt).toISOString();
    }
    return {
      id: postData.id,
      title: postData.title,
      imgUrl: imgUrls[0] || '', // Assuming the first image is the primary image
      heartCnt: parseInt(postData.likesCount),
      commentCnt: parseInt(postData.commentsCount),
      createdAt: postDateISOString,
    };
  };

  const handleItemClick = (post: Post) => {
    navigate(`BrandCommunity/post/${post.id}`);
  };

  return (
    <ComLayout currentPath={currentPath}>
      <BWrapper>
        <PostList posts={posts} onClickItem={handleItemClick} />
      </BWrapper>
    </ComLayout>
  );
};

export default BrandCom;
