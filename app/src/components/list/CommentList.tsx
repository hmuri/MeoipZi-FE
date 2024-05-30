import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

// Define the Comment type
interface Comment {
    id: string;
    content: string; // Add the content property
    username: string;
    parentId: string | null;
}

// Define the props interface for CommentList component
interface CommentListProps {
  comments: Comment[];
  currentUser: string; // Add currentUser property
  onDeleteComment: (commentId: string) => void; // Callback for deleting a comment
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

const CommentList: React.FC<CommentListProps> = ({ comments, currentUser, onDeleteComment }) => {
    return (
      <Wrapper>
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} currentUser={currentUser} onDeleteComment={onDeleteComment} />
        ))}
      </Wrapper>
    );
  };
  
  export default CommentList;

