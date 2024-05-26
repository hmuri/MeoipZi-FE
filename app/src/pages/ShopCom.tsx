import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import ComLayout from "../components/CommunityLayout";
import axiosInstance from "../api/axios";

interface MainPageProps {
  currentPath: string;
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

const SWrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15vh;
`;

const ShopCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0); // State to hold totalElements

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<{ content: PostData[], totalElements: number }>(
        `${process.env.REACT_APP_API_BASE_URL}/communities/latest?category=shop&page=0&size=20`
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
      <SWrapper>
        <PostList posts={posts} onClickItem={handleItemClick} />
      </SWrapper>
    </ComLayout>
  );
};

export default ShopCom;
