import React, { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import LikeShort from "../components/MyPageUI/LikeShort";
import LikeImage from "../components/MyPageUI/LikeImage";
import Footer from "../components/Footer";
import ProfileLayout from "../components/MyPageUI/ProfileLayoutl";
import PButton from "../components/MyPageUI/PButton";
import likeClicked from "../images/likeClicked.png"
import likeNoClicked from "../images/likeNoClicked.png";
import postClicked from "../images/postClicked.png";
import postNoClicked from "../images/postNoClicked.png";
import LikeComments from "../components/MyPageUI/LikeComment";
import axiosInstance from "../api/axios";


const PageStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; /* Add this line */
`;

const ButtonLocation = styled.div`
  background: #ececec;
  position: relative;
  top: 80px; /* Set distance from the top */
  margin: auto; /* Center horizontally */
  height: 40px;
  max-width: 330px; /* Set maximum width */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ScrollableContainer = styled.div`
  position: fixed;
  top: 110px; /* Adjust this value to set the distance from the top */
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Adjust the width as needed */
  max-width: 375px; /* Set a maximum width */
  bottom: 0;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 130px;
  margin-left: 20px;
`;


interface MainPageProps {
  comments: any[];
  likedOutfits: { id: number; imgUrl: string; createdAt: string }[];
  likedSFs: { id: number; imgUrl: string; createdAt: string }[];
  likedComms: { id: number; title: string; createdAt: string; likesCount: number; cmtCount: number }[];
}

const MyPage_like: FC = () => {
  const navigate = useNavigate();
  const [likedOutfits, setLikedOutfits] = useState<{ id: number; imgUrl: string; createdAt: string }[]>([]);
  const [likedSFs, setLikedSFs] = useState<{ id: number; imgUrl: string; createdAt: string }[]>([]);
  const [likedComms, setLikedComms] = useState<{ id: number; title: string; createdAt: string; likesCount: number; cmtCount: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/likes`);
        const data = response.data;
        setLikedOutfits(data.likedOutfits);
        setLikedSFs(data.likedSFs);
        setLikedComms(data.likedComms);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <PageStyle>
      <ProfileLayout>
        <ScrollableContainer>
        <Style>
          <h3>코디</h3>
          {/* Pass likedOutfits as a prop */}
          <LikeImage likedOutfits={likedOutfits.map(outfit => outfit.imgUrl)} />
          <h3>숏폼</h3>
          {/* Pass likedSFs as a prop */}
          <LikeShort sfs={likedSFs.map(sf => sf.imgUrl)} />
          <h3>Comments</h3>
          {/* Pass likedComms as a prop */}
          <LikeComments comments={likedComms} />
        </Style>
      </ScrollableContainer>
      </ProfileLayout>
    </PageStyle>
  );
};

export default MyPage_like;