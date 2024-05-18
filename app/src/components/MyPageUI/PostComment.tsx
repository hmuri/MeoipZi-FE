import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";

import CommentList from "../list/CommentList";

interface Comment {
  id: number;
  imgUrl: string;
  createdAt: string;
  content: string; // Add the content property
}

const SWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
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

const PostComment: FC = () => {
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

  return (
    <>
      <SWrapper>
        <Container>
          <div>
            <h2>Outfits Comments</h2>
            <CommentList comments={cmtOutfits} />
          </div>
          <div>
            <h2>Short Forms Comments</h2>
            <CommentList comments={cmtShortforms} />
          </div>
          <div>
            <h2>Community Comments</h2>
            <CommentList comments={cmtComms} />
          </div>
        </Container>
      </SWrapper>
    </>
  );
};

export default PostComment;