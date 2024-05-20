// PostList.tsx
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
  gap: 16px;
  margin-top: 20px;
`;

const PostList: React.FC<PostListProps> = ({ posts, onClickItem }) => {
  return (
    <Wrapper>
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          onClick={() => onClickItem(post)}
        />
      ))}
    </Wrapper>
  );
};

export default PostList;
