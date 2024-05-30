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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto; /* Allow scrolling */
  min-height: calc(100vh - 50px); /* Adjust 50px according to your header height */
`;

const PostListContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ToggleButton = styled.button`
  background: #9e9e9e;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  margin: 3px;
  position: fixed;
  top: 140px;
  left: 100px;
  z-index: 999; /* Ensure the button is on top of other elements */
`;

const FreeCom: FC<MainPageProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // State to track current page
  const [totalPages, setTotalPages] = useState<number>(1); // State to track total pages
  const [showLatest, setShowLatest] = useState<boolean>(true); // State to toggle between latest and popular posts

  useEffect(() => {
    fetchData();
  }, [currentPage, showLatest]); // Refetch data when currentPage or showLatest state changes

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get<{ content: PostData[], totalElements: number }>(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${showLatest ? "latest" : "popular"}?category=play&page=${currentPage - 1}&size=20`
      );
      const postData = response.data.content;
      const transformedPosts = postData.map(transformPostData);
      setPosts(transformedPosts);
      setTotalPages(Math.ceil(response.data.totalElements / 20)); // Calculate total pages
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

  const handleToggle = () => {
    setShowLatest(prevState => !prevState); // Toggle between latest and popular posts
    setCurrentPage(1); // Reset current page when toggling between latest and popular
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <ComLayout currentPath={currentPath} totalElements={totalPages}>
      <FWrapper>
        <ToggleButton onClick={handleToggle}>{showLatest ? " Show Popular " : " Show Latest "}</ToggleButton>
        <PostListContainer>
          <PostList posts={posts} onClickItem={handleItemClick} />
        </PostListContainer>
        <div>
          <button onClick={handlePrevPage}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </FWrapper>
    </ComLayout>
  );
};

export default FreeCom;
