import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

interface Post {
  id: number;
  title: string;
  imgUrl: string;
  heartCnt: number;
  commentCnt: number;
  createdAt: string;
}

interface PostListProps {
  posts: Post[];
  onClickItem: (post: Post) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
`;

const PostTitle = styled.h2`
  margin-bottom: 8px;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
`;

const PostList: React.FC<PostListProps> = ({ posts, onClickItem }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostItem key={post.id} onClick={() => onClickItem(post)}>
          <PostTitle>{post.title}</PostTitle>
          <PostImage src={post.imgUrl} alt={post.title} /> {/* Render the image */}
          <p>Heart Count: {post.heartCnt}</p>
          <p>Comment Count: {post.commentCnt}</p>
          <p>Created At: {post.createdAt}</p>
        </PostItem>
      ))}
    </Wrapper>
  );
};

export default PostList;