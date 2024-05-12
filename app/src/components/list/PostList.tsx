import React from "react";
import styled from "styled-components";
import PostListItem from "./PostListItem";

interface Post {
  id: number;
  title: string;
  imgUrl: string;
  heartCnt: number;
  commentCnt: number;
  postDate: string;
}

interface PostListProps {
  posts: Post[];
  onClickItem: (post: Post) => void;
  loading?: boolean; // Added loading state
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const Message = styled.p`
  margin: 16px 0;
  font-size: 16px;
  color: #777;
`;

function PostList(props: PostListProps) {
  const { posts, onClickItem, loading } = props;

  return (
    <Wrapper>
      {loading ? (
        <Message>Loading...</Message>
      ) : posts.length === 0 ? (
        <Message>No posts available</Message>
      ) : (
        posts.map((post) => (
          <PostListItem
            key={post.id} // Assigning the unique key prop
            post={post}
            onClick={() => {
              onClickItem(post);
            }}
          />
        ))
      )}
    </Wrapper>
  );
}

export default PostList;
