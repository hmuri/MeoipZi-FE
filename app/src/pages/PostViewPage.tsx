import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import CommentList from "../components/list/CommentList";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

interface Comment {
  id: string;
  content: string;
  username: string;
}

interface PostDetails {
  communityId: number;
  userName: string;
  profileImg: string;
  createdAt: string;
  title: string;
  contents: string;
  imgUrl: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  category: string;
  liked: boolean; // This field indicates if the current user has liked the post
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
      margin-bottom: 5px;
    }
  }
`;

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
  position: relative;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
  margin-top: 20px;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const MetaInfo = styled.div`
  color: #a9a9a9;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2px; /* Adjust the margin-bottom */
`;

const UserInfo = styled.div`
  color: #a9a9a9;
  font-size: 10px;
  display: flex;
  align-items: center;
  top: 3px; /* Adjust the top margin */
`;

const DataContainer = styled.div`
  display: flex;
  color: #a9a9a9;
  align-items: center;
  margin-top: 5px; /* Adjust as needed */
  width: 100%;
`;

const LikesText = styled.p`
  margin-right: 20px; /* Adjust as needed */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PostViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const [comment, setComment] = useState<string>("");
  const [viewerId, setViewerId] = useState<string>("");
  const [replyContents, setReplyContents] = useState<{ [commentId: string]: string }>({});


  useEffect(() => {
    fetchPostDetails();
    fetchViewerId();
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

  const fetchViewerId = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_BASE_URL}/profiles/info`
      );
      setViewerId(response.data.nickname); // Set the viewerId from the response
    } catch (error) {
      console.error("Error fetching viewerId:", error);
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
  
    try {
      const formData = new FormData();
      formData.append("content", comment);
  
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/comments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setComment(""); // Clear the input after successful submission
      fetchPostDetails(); // Re-fetch post details to update comments
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(`${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`);
      fetchPostDetails(); // Re-fetch post details to update comments
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReplyChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, commentId: string) => {
    const { value } = event.target;
    setReplyContents(prevState => ({
      ...prevState,
      [commentId]: value
    }));
  };

  const handleReplySubmit = async (commentId: string) => {
    const replyContent = replyContents[commentId];
    if (!replyContent.trim()) return;
  
    try {
      const formData = new FormData();
      formData.append("parentId", commentId);
      formData.append("content", replyContent);
  
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/replies`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      setReplyContents(prevState => {
        const newState = { ...prevState };
        delete newState[commentId]; // Remove the reply content after successful submission
        return newState;
      });
  
      fetchPostDetails();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  

  const handlePostDelete = async () => {
    try {
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}`
      );
      navigate("/BrandCommunity"); // Navigate back to the community page after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handlePostUpdate = async () => {
    navigate(`/WritePost/${id}`, { state: { postDetails } }); // Pass postDetails as state
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/like`,
        { contentType: "community" }
      );

      if (response.status === 200 && postDetails) {
        setPostDetails({
          ...postDetails,
          likesCount: postDetails.liked ? postDetails.likesCount - 1 : postDetails.likesCount + 1,
          liked: !postDetails.liked,
        });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ButtonContainer>
          <Button
            title="뒤로 가기"
            onClick={() => {
              navigate("/BrandCommunity");
            }}
          />
          {viewerId === postDetails?.userName && (
            <>
              <Button title="글 삭제하기" onClick={handlePostDelete} />
              <Button title="글 수정하기" onClick={handlePostUpdate} />
            </>
          )}
        </ButtonContainer>
        <PostContainer>
          <TitleText>{postDetails?.title}</TitleText>
          <UserInfo>Posted by: {postDetails?.userName || "Anonymous"}</UserInfo>
          <MetaInfo>Created at: {new Date(postDetails?.createdAt || "").toLocaleString()}</MetaInfo>
          <ContentText>{postDetails?.contents}</ContentText>
          {postDetails?.imgUrl && <img src={postDetails.imgUrl} alt="Post Image" />}
          <DataContainer>
            <LikesText>Likes: {postDetails?.likesCount}</LikesText>
            <Button title={postDetails?.liked ? "Unlike" : "Like"} onClick={handleLike} />
            Comments: {postDetails?.commentsCount}
          </DataContainer>
        </PostContainer>
        <CommentLabel>댓글</CommentLabel>
        <CommentList comments={postDetails?.comments || []} currentUser={viewerId} onDeleteComment={handleDeleteComment} />
        <TextInput height={40} value={comment} onChange={handleCommentChange} />
        <Button title="댓글 작성하기" onClick={handleCommentSubmit} />
        
        {postDetails?.comments.map(comment => (
        <div key={comment.id}>
        <div>{comment.content}</div>
        <TextInput
          height={40}
          value={replyContents[comment.id] || ""}
          onChange={(e) => handleReplyChange(e, comment.id)}
        />
        <Button
          title="답글 작성하기"
          onClick={() => handleReplySubmit(comment.id)}
        />
        </div>
        ))}
      </Container>
    </Wrapper>
  );
};

export default PostViewPage;