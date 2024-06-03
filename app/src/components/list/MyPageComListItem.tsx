import React, { MouseEventHandler } from "react";
import styled from "styled-components";

// Define the Comment type
interface Comment {
    id: string;
    title: string;
    likesCount: number;
    cmtCount: number;
    imgUrl?: string;
    createAt: string;
}

interface CommentListItemProps {
    comment: Comment;
    onClick: MouseEventHandler<HTMLDivElement>;
  }

// Define a styled component to render a single comment
const CommentWrapper = styled.div`
    padding: 8px; /* Decrease padding */
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 8px; /* Decrease margin */
    width: 280px;
    height: 120px; /* Decrease height */
`;

const CommentTitle = styled.h3`
    margin-bottom: 4px; /* Decrease margin */
`;

const CommentDetails = styled.div`
    color: #666;
    font-size: 12px;
    margin: -10px 0; /* Adjust margin to pack the details more tightly */
    padding: 0;
`;

const Styledp = styled.p`
    line-height: 1;
    margin: -10px 0; /* Adjust margin to pack the details more tightly */
    padding: 0;
`;

const MyPageComment: React.FC<CommentListItemProps> = ({ comment, onClick }) => {
    return (
        <CommentWrapper onClick={onClick}>
            <CommentTitle>{comment.title}</CommentTitle>
            <CommentDetails>
                <Styledp>Likes: {comment.likesCount}</Styledp>
                <Styledp>Comments: {comment.cmtCount}</Styledp>
                <Styledp>Created At: {comment.createAt}</Styledp>
            </CommentDetails>
        </CommentWrapper>
    );
}

export default MyPageComment;

