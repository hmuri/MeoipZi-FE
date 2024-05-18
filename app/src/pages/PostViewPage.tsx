import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import CommentList from "../components/list/CommentList";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

interface Comment {
  id: number;
  userName: string;
  imgUrl: string;
  createdAt: string;
  content: string;
}

interface PostDetails {
  communityId: number;
  userName: string | null;
  profileImg: string;
  createdAt: string;
  title: string;
  contents: string;
  imgUrl: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
}

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

const PostViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      const response = await axiosInstance.get<PostDetails>(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${id}`
      );
      setPostDetails(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/comments`,
        { content: comment }
      );
      setComment(""); // Clear the input after successful submission
      fetchPostDetails(); // Re-fetch post details to update comments
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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
          <TitleText>{postDetails?.title}</TitleText>
          <ContentText>{postDetails?.contents}</ContentText>
          {postDetails?.imgUrl && <img src={postDetails.imgUrl} alt="Post Image" />}
          <p>Posted by: {postDetails?.userName || "Anonymous"}</p>
          <p>Created at: {new Date(postDetails?.createdAt || "").toLocaleString()}</p>
          <p>Likes: {postDetails?.likesCount}</p>
          <p>Comments: {postDetails?.commentsCount}</p>
        </PostContainer>

        <CommentLabel>댓글</CommentLabel>
        <CommentList comments={postDetails?.comments || []} />

        <TextInput
          height={40}
          value={comment}
          onChange={handleCommentChange}
        />
        <Button
          title="댓글 작성하기"
          onClick={handleCommentSubmit}
        />
      </Container>
    </Wrapper>
  );
};

export default PostViewPage;
