{/*
import React, { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../components/list/CommentList";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button"
import data from '../data/Commentdata.json";

interface Post {
    id: string;
    title: string;
    content: string;
    comments: string[];
}

interface PostViewPageProps {}

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;

    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

const PostViewPage: React.FC<PostViewPageProps> = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const post: Post | undefined = data.find((item: Post) => item.id === postId);

    const [comment, setComment] = useState<string>("");

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    return (
        <Wrapper>
            <Container>
                <Button 
                    title="뒤로 가기"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <PostContainer>
                    <TitleText>{post?.title}</TitleText>
                    <ContentText>{post?.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post?.comments || []} />

                <TextInput
                    height={40}
                    value={comment}
                    onChange={handleCommentChange}
                />
                <Button
                    title="댓글 작성하기"
                    onClick={() => {
                        // Implement logic to save comment
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
*/}
export {}