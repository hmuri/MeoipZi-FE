import React from "react";
import styled from "styled-components";
import CommentListItem from "./CommentListItem";

// Define the Comment type
interface Comment {
    id: number;
    content: string;
}

// Define the props interface for CommentList component
interface CommentListProps {
    comments: Comment[]; // Use the Comment type here
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

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <Wrapper>
            {comments.map((comment) => (
                <CommentListItem key={comment.id} comment={comment} /> // Pass comment as prop
            ))}
        </Wrapper>
    );
}

export default CommentList;

