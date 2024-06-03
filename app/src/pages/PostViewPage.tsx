import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import CommentList from "../components/list/CommentList";
import ReplyList from "../components/list/ReplyList";

interface Comment {
  id: string;
  content: string;
  username: string;
  parentId: string | null; // Add parentId to Comment interface
  replies?: Reply[];
}

interface Reply {
  id: string;
  content: string;
  username: string;
  parentId: string;
}

interface PostDetails {
  communityId: number;
  userName: string;
  profileImg: string;
  createdAt: string;
  title: string;
  contents: string;
  imgUrl: string[];
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  category: string;
  liked: boolean;
}

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 720px; /* 최대 너비 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 페이지를 화면의 상단에 맞추기 위해 flex-start로 설정 */
  overflow-y: auto; /* 세로 스크롤 가능하도록 설정 */

  /* 페이지가 화면의 윗쪽을 넘어가지 않도록 스크롤이 되면 숨김 */
  position: sticky;
  top: 0;
  margin-top: 10vh;
  height: 100vh;
  z-index: 1;
`;


const Container = styled.div`
  width: 100%;
  max-width: 720px;
  padding-bottom: 100vh;

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
  margin-bottom: 2px;
`;

const UserInfo = styled.div`
  color: #a9a9a9;
  font-size: 10px;
  display: flex;
  align-items: center;
  top: 3px;
`;

const DataContainer = styled.div`
  display: flex;
  color: #a9a9a9;
  align-items: center;
  margin-top: 5px;
  width: 100%;
`;

const LikesText = styled.p`
  margin-right: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const PostViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const [comment, setComment] = useState<string>("");
  const [viewerId, setViewerId] = useState<string>("");
  const [replyContents, setReplyContents] = useState<{ [commentId: string]: string }>({});
  const [showReplies, setShowReplies] = useState<{ [commentId: string]: boolean }>({});

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
      setViewerId(response.data.nickname);
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

      setComment("");
      fetchPostDetails();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      // Recursively delete comment and its replies
      const deleteCommentsRecursive = async (commentId: string) => {
        // Find the comment to delete from the postDetails
        const commentToDelete = postDetails?.comments.find(comment => comment.id === commentId);
    
        // If the comment to delete is found
        if (commentToDelete) {
          // Delete the comment
          await axiosInstance.delete(`${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/comments/${commentId}`);
    
          // Check if the comment has replies
          if (commentToDelete.replies) {
            // Recursively delete replies of the comment being deleted
            for (const reply of commentToDelete.replies) {
              await deleteCommentsRecursive(reply.id);
            }
          }
        }
      };
    
      // Call the recursive function to delete the comment and its replies
      await deleteCommentsRecursive(commentId);
    
      // After deletion, refetch the post details to update comments
      fetchPostDetails();
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
        delete newState[commentId];
        return newState;
      });

      fetchPostDetails();
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDeleteReply = async (id: string) => {
    try {
      await axiosInstance.delete(`${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails?.communityId}/replies/${id}`);
      fetchPostDetails(); // Re-fetch post details to update comments
    } catch (error) {
      console.error("Error deleting comment:", error);
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

  const handleToggleReplies = (commentId: string) => {
    setShowReplies(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  const separateCommentsAndReplies = (comments: Comment[]): (Comment & { replies: Reply[] })[] => {
    const commentsMap: { [id: string]: Comment & { replies: Reply[] } } = {};
  
    // Iterate through all comments and initialize each entry in the commentsMap
    comments.forEach(comment => {
      // Check if the comment is a reply (i.e., it has a parent)
      if (comment.parentId) {
        // Find the parent comment using the parentId of the reply
        const parentComment = commentsMap[comment.parentId];
        // If the parent comment is found, add the reply to its 'replies' array
        if (parentComment) {
          parentComment.replies.push(comment as Reply); // Type assertion here
        }
      } else {
        // If the comment does not have a parent, it's a top-level comment
        commentsMap[comment.id] = { ...comment, replies: [] };
      }
    });
  
    // Filter out the top-level comments
    const topLevelComments = Object.values(commentsMap).filter(comment => !comment.parentId);
    
    return topLevelComments;
  };
  
  const processedComments = postDetails ? separateCommentsAndReplies(postDetails.comments) : [];

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
        <ImageContainer>
          {postDetails?.imgUrl.map((url, index) => (
            <ImagePreview key={index} src={url} alt={`Post Image ${index}`} />
          ))}
        </ImageContainer>
        <DataContainer>
          <LikesText>Likes: {postDetails?.likesCount}</LikesText>
          <Button title={postDetails?.liked ? "Unlike" : "Like"} onClick={handleLike} />
          Comments: {postDetails?.commentsCount}
        </DataContainer>
      </PostContainer>

      <CommentLabel>Comments</CommentLabel>
      <TextInput value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
      <Button title="Submit Comment" onClick={handleCommentSubmit} />

      {processedComments.map(comment => (
        <div key={comment.id}>
          <CommentList
            comments={[comment]} // Pass the current comment as an array to CommentList
            onDeleteComment={() => handleDeleteComment(comment.id)}
            currentUser={viewerId}
          />
          {/* Render replies */}
          {comment.replies.map(reply => (
            <div key={reply.id}>
              <ReplyList
                replies={[reply]} // Pass the current reply as an array to ReplyList
                currentUser={viewerId}
                onDeleteReply={handleDeleteReply} // Assuming you have a function to handle reply deletion
              />
            </div>
          ))}
          {/* Render reply input for the current comment */}
          <TextInput
            value={replyContents[comment.id] || ""}
            onChange={event => handleReplyChange(event, comment.id)}
            placeholder="Add a reply"
          />
          <Button title="Submit Reply" onClick={() => handleReplySubmit(comment.id)} />
          {/* Conditionally render the expanded replies */}
          {showReplies[comment.id] && comment.replies.length > 3 && (
            <div>
              {comment.replies.slice(3).map(reply => (
                <div key={reply.id}>
                  <ReplyList
                    replies={[reply]} // Pass the current reply as an array to ReplyList
                    currentUser={viewerId}
                    onDeleteReply={handleDeleteReply} // Assuming you have a function to handle reply deletion
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Container>
  </Wrapper>
);
};

export default PostViewPage;
