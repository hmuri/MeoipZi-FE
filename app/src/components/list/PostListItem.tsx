import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface Post {
  id: number;
  title: string;
  // Additional properties such as heartCount, commentCount, postDate
  heartCnt: number;
  commentCnt: number;
  postDate: string;
}

interface PostListItemProps {
  post: Post;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Wrapper = styled.div`
  width: 339px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid white;
  cursor: pointer;
  background: white;

  :hover {
    background: lightgrey;
  }
`;

const TitleText = styled.p`
overflow: hidden;
color: #464646;
margin: 1vh 1vh 1vh;

text-overflow: ellipsis;
font-family: Noto Sans Arabic;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 100%; /* 14px */
letter-spacing: -0.14px;
`;

const CountText = styled.p`
//width: 21px;
color: #A9A9A9;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 100%; /* 12px */
margin: 0px 1vh 1vh;
`;

function PostListItem(props: PostListItemProps) {
  const { post, onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <TitleText>{post.title}</TitleText>
      <CountText>{`${post.postDate}`}</CountText>
      <CountText>{`Hearts: ${post.heartCnt} | Comments: ${post.commentCnt}`}</CountText>
      
    </Wrapper>
  );
}

export default PostListItem;
