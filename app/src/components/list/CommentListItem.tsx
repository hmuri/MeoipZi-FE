import React from "react";
import styled from "styled-components";

interface Comment {
    id: number;
    imgUrl: string;
    createdAt: string;
    content: string; // Add the content property
}

interface CommentListItemProps {
    comment: Comment;
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

const CommentListItem: React.FC<CommentListItemProps> = ({ comment }) => {
    return (
        <Wrapper>
            <ContentText>{comment.content}</ContentText>
        </Wrapper>
    );
}

export default CommentListItem;

