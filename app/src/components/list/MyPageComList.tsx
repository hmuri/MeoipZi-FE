import React from "react";
import styled from "styled-components";
import MyPageComment from "./MyPageComListItem";

// Define the Comment type
interface Comment {
    id: string;
    title: string;
    likesCount: number;
    cmtCount: number;
    imgUrl?: string;
    createAt: string; // Add the content property
}

// Define the props interface for CommentList component
interface CommentListProps {
    comments: Comment[]; // Use the Comment type here
    onClickItem: (comment: Comment) => void;
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

const MyPageCommentList: React.FC<CommentListProps> = ({ comments, onClickItem }) => {
    return (
      <Wrapper>
        {comments.map((comment) => (
          <MyPageComment /*key={comment.id}*/ comment={comment} onClick={() => onClickItem(comment)}/>
        ))}
      </Wrapper>
    );
  };
  
  export default MyPageCommentList;