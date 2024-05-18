import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../../api/axios";

interface Post {
  id: number;
  title: string;
  imgUrl: string;
  content: string;
  category: string;
  createdAt: string;
  likesCount: number;
  cmtCount: number;
  heartCnt: number; // Example additional property
  commentCnt: number; // Example additional property
  postDate: string; // Example additional property
}

interface MainPageProps {
  uploadedCommList: { id: number; title: string; imgUrl: string; createdAt: string; likesCount: number; cmtCount: number }[];
  uploadedSFList: { id: number; imgUrl: string; createdAt: string }[];
}

const SWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

interface PostFeedProps {
  uploadedCommList: any[]; // Define uploadedCommList prop
}

const PostFeed: FC<PostFeedProps> = ({ uploadedCommList }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]); // State to store posts

  useEffect(() => {
    if (uploadedCommList && uploadedCommList.length > 0) {
      // Map uploadedCommList to posts
      const mappedPosts: Post[] = uploadedCommList.map((comm) => ({
        id: comm.id,
        title: comm.title,
        imgUrl: comm.imgUrl,
        content: "", // Add content if available
        category: "", // Add category if available
        createdAt: comm.createdAt,
        likesCount: comm.likesCount,
        cmtCount: comm.cmtCount,
        heartCnt: 0, // Example additional property
        commentCnt: 0, // Example additional property
        postDate: "", // Example additional property
      }));
      setPosts(mappedPosts);
    }
  }, [uploadedCommList]);

  return (
    <>
      <SWrapper>
        <Container>
          {/* Render posts */}
          {posts.map((post: Post) => (
            <div key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
              <img src={post.imgUrl} alt={post.title} />
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </Container>
      </SWrapper>
    </>
  );
};

export default PostFeed;
