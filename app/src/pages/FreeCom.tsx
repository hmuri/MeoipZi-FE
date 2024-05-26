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
  communityId: number;
  title: string;
  imgUrl: string;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
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
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
`;

const FreeCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<{ content: PostData[], totalElements: number }>(
        `${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=free&page=0&size=20`
      );
      const postData = response.data.content;
      const transformedPosts = postData.map(transformPostData);
      setPosts(transformedPosts);
      setTotalElements(response.data.totalElements); // Set totalElements from the response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const transformPostData = (postData: PostData): Post => {
    return {
      id: postData.communityId,
      title: postData.title,
      imgUrl: postData.imgUrl,
      heartCnt: postData.likesCount,
      commentCnt: postData.commentsCount,
      createdAt: new Date(postData.createdAt).toLocaleString(),
    };
  };

  const handleItemClick = (post: Post) => {
    navigate(`/post/${post.id}`);
  };

  return (
    <ComLayout currentPath={currentPath} totalElements={totalElements}>
      <FWrapper>
        <PostList posts={posts} onClickItem={handleItemClick} />
      </FWrapper>
    </ComLayout>
  );
};

export default FreeCom;