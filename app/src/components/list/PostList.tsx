import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

interface Post {
  id: number;
  title: string;
  heartCnt: number;
  commentCnt: number;
  postDate: string;
}

interface PostListProps {
  posts: Post[];
  onClickItem: (post: Post) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  // Fixed typo in 'align-items'
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;  // Fixed typo in 'margin-bottom'
    }
  }
`;

function PostList(props: PostListProps) {
  const { posts, onClickItem } = props;

  return (
    <Wrapper>
      {posts.map((post, index) => {
        return (
          <PostListItem
            key={post.id}
            post={post}
            onClick={() => {
              onClickItem(post);
            }}
          />
        );
      })}
    </Wrapper>
  );
}

export default PostList;
