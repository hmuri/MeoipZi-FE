import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface Post {
  id: number;
  title: string;
  imgUrl?: string;
  heartCnt: number;
  commentCnt: number;
  createdAt: string;
}

interface PostListItemProps {
  post: Post;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 16px;
  cursor: pointer;
  background: white;
  transition: background-color 0.3s;

  :hover {
    background: lightgrey;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 16px;
`;

const TitleText = styled.p`
  color: #464646;
  margin: 0 0 8px;
  font-family: Noto Sans Arabic;
  font-size: 16px;
  font-weight: 600;
`;

const MetaText = styled.p`
  color: #a9a9a9;
  margin: 4px 0;
  font-family: Roboto;
  font-size: 12px;
`;

const Image = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
`;

const PostListItem: React.FC<PostListItemProps> = ({ post, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <TextWrapper>
        <TitleText>{post.title}</TitleText>
        <MetaText>{post.createdAt}</MetaText>
        <MetaText>{`Hearts: ${post.heartCnt} | Comments: ${post.commentCnt}`}</MetaText>
      </TextWrapper>
      {post.imgUrl && <Image src={post.imgUrl} alt={post.title} />}
    </Wrapper>
  );
};

export default PostListItem;
