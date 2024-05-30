import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";

interface Comment {
    id: string;
    content: string; // Add the content property
    username:string;
}

interface CommentListItemProps {
    comment: Comment;
    currentUser: string; // Add currentUser property
    onDeleteComment: (commentId: string) => void; // Callback for deleting a comment
  }

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; // Fixed typo in 'align-items'
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px; // Fixed typo in 'border-radius'
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 14px;
`;
const DataText = styled.p`
    font-size: 10px;
    color: #a9a9a9;

`

const CommentListItem: React.FC<CommentListItemProps> = ({ comment, currentUser, onDeleteComment }) => {
    const { id, content, username } = comment;
    return (
        <Wrapper>
            <DataText>{`${comment.username}`}</DataText>
            <ContentText>{content}</ContentText>
            {currentUser === username && (
        <Button
          title="Delete"
          onClick={() => onDeleteComment(id)}
          // Add any styling or icons for the delete button
        />
      )}
        </Wrapper>
    );
}

export default CommentListItem;

