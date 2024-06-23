import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";

import MyPageCommentList from "../list/MyPageComList";
import PostList from "../list/PostList";
import PostShortList from "./PostShortList";
import VerticalImageGrid from "../mainpageUI/VerticalImageGrid";

interface Comment {
  id: string;
  title: string;
  likesCount: number;
  cmtCount: number;
  imgUrl?: string;
  createAt: string; // Add the content property
}

const SWrapper = styled.div`
  padding: 16px;
  width: 50vh; /* Set initial width */
  max-width: 90%; /* Set maximum width to prevent overflow */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
  margin-left: auto;
  margin-right: auto; /* Center horizontally */
  
  /* Media query for responsiveness */
  @media screen and (max-width: 768px) {
    width: 90%; /* Adjust width for smaller screens */
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 355px;
  height: 100%;
  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
  flex: 1;
`;

const NavigateButton = styled.button`
  width: 40px;
  height: 25px;
  background-color: transparent;
  color: #8B8B8B;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px; /* Adjust font size as needed */
  font-weight: bold;
  padding: 0;
  margin-bottom: 5px;
`;

{/*
const PostComment: FC = () => {
  const [shortForms, setShortForms] = useState<Comment[]>([]);
  const [outfits, setOutfits] = useState<Comment[]>([]);
  const [communities, setCommunities] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const [
          shortFormsResponse,
          outfitsResponse,
          communitiesResponse
        ] = await Promise.all([
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments/shortforms`),
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments/outfits`),
          axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments/communities`)
        ]);

        setShortForms(shortFormsResponse.data.cmtShortforms);
        setOutfits(outfitsResponse.data.cmtOutfits);
        setCommunities(communitiesResponse.data.cmtComms);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <>
      <SWrapper>
        <Container>
          <div>
            <h2>Short Forms Comments</h2>
            <CommentList comments={shortForms} />
          </div>
          <div>
            <h2>Outfits Comments</h2>
            <CommentList comments={outfits} />
          </div>
          <div>
            <h2>Communities Comments</h2>
            <CommentList comments={communities} />
          </div>
        </Container>
      </SWrapper>
    </>
  );
};

export default PostComment;
*/}

const ShortFormGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr); /* 3 columns with equal width */
gap: 15px; /* Gap between grid items */
margin: 10px; /* Margin on top and bottom */
`;

const ShortFormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
`;

const Video = styled.video`
  width: 100%;
  max-width: 300px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3 columns with 100px width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

const Image = styled.img`
  width: 100%; /* Image width */
  height: 100%; /* Image height */
`;

const PostComment: FC = () => {
  const navigate = useNavigate();
  const [cmtOutfits, setCmtOutfits] = useState<Comment[]>([]);
  const [cmtShortforms, setCmtShortforms] = useState<Comment[]>([]);
  const [cmtComms, setCmtComms] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/comments`);

        const { cmtOutfits, cmtShortforms, cmtComms } = response.data;

        setCmtOutfits(cmtOutfits);
        setCmtShortforms(cmtShortforms);
        setCmtComms(cmtComms);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleItemClick = (comments: Comment) => {
    navigate(`/post/${comments.id}`);
  };

  const handleOutfitClick = (comments: Comment) => {
    navigate(`/outfit/${comments.id}`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <SWrapper>
        <Container>
          <div>
            <h2>Outfits Comments</h2>
            <ImageGrid>
              {cmtOutfits.map((outfit: any) => (
                <Image key={outfit.id} src={outfit.imgUrl} alt={`Outfit ${outfit.id}`} onClick={() => handleOutfitClick(outfit)}/>
              ))}
            </ImageGrid>
            <NavigateButton onClick={() => handleNavigate('/outfit-comments')}>. . .</NavigateButton>
          </div>
          <div>
            <h2>Short Forms Comments</h2>
            <ShortFormGrid>
        {cmtShortforms.map((shortForm) => (
          <ShortFormItem key={shortForm.id}>
            <Video controls>
              <source src={shortForm.imgUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </Video>
            <p>{new Date(shortForm.createAt).toLocaleDateString()}</p>
          </ShortFormItem>
        ))}
      </ShortFormGrid>
            <NavigateButton onClick={() => handleNavigate('/shorts-comments')}>. . .</NavigateButton>
          </div>
          <div>
            <h2>Community Comments</h2>
            <MyPageCommentList comments={cmtComms} onClickItem={handleItemClick}/>
            <NavigateButton onClick={() => handleNavigate('/community-comments')}>. . .</NavigateButton>
          </div>
        </Container>
      </SWrapper>
    </>
  );
};

export default PostComment;