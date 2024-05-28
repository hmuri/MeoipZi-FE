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
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 16px;
    width: 250px;
    height: 150px;
`;

const CommentTitle = styled.h3`
    margin-bottom: 6px;
`;

const CommentDetails = styled.div`
    color: #666;
    font-size: 12px;
    margin:0;
    padding:0;
`;

const Styledp = styled.p`
    line-height:1;
    margin:0;
    padding:0;
`

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

