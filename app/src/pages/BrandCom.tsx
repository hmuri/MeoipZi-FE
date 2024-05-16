import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import Button from "../components/ui/Button";
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
  align-items: center;  // Fixed typo in 'align-items'
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

const BrandCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined); // Initialize imageURL state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch image URLs
      const imageResponse = await axiosInstance.get<string[][]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=brand&page=0&size=20`);
      const firstImageUrl = imageResponse.data[0]?.[0]; // Access the first element of the outer array and then the first element of the inner array
      setImageURL(firstImageUrl);

      // Fetch post data
      const response = await axiosInstance.get<PostData[]>(`${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=brand&page=0&size=20`);
      const transformedPosts = response.data.map(transformPostData);
      setPosts(transformedPosts);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformPostData = (postData: PostData): Post => {
    let postDateISOString = '';
    if (Date.parse(postData.createdAt)) {
      postDateISOString = new Date(postData.createdAt).toISOString();
    }
    return {
      id: postData.id,
      title: postData.title,
      imgUrl: postData.imgUrl, // Add imgUrl property
      heartCnt: parseInt(postData.likesCount),
      commentCnt: parseInt(postData.commentsCount),
      createdAt: postDateISOString,
    };
  };

  const handleItemClick = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  return (
    <ComLayout currentPath={currentPath}>
      <BWrapper>
        {imageURL ? (
          <img src={imageURL} alt="Brand" />
        ) : (
          <p>Loading...</p>
        )}
        <PostList posts={posts} onClickItem={handleItemClick} />
      </BWrapper>
    </ComLayout>
  );
};

export default BrandCom;