import React, { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import LikeShort from "../components/MyPageUI/LikeShort";
import LikeImage from "../components/MyPageUI/LikeImage";
import Footer from "../components/Footer";
import ProfileLayout from "../components/MyPageUI/ProfileLayout";
import PButton from "../components/MyPageUI/PButton";
import likeClicked from "../images/likeClicked.png"
import likeNoClicked from "../images/likeNoClicked.png";
import postClicked from "../images/postClicked.png";
import postNoClicked from "../images/postNoClicked.png";


const PageStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; /* Add this line */
`;

const ButtonLocation = styled.div`
  background: #ececec;
  height: 40px;
  width: 330px;
  display: flex; /* Add display flex */
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  border-radius: 5px;
`;

const Style = styled.div`
display: flex;
flex-direction: column;
`;



/*
interface MyProps {
  children: ReactNode;
}
*/
const MyPage_like: FC = (props) => {
  const navigate = useNavigate();

  const handleLikeClick = (route: string) => {
    // Navigate to the specified route
    navigate(route);
  };

  return (
  <PageStyle>
    <ProfileLayout>
      <ButtonLocation>
        <PButton
            src={likeClicked}
            alt="like clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/likes")}
            route="/mypage/likes" // Specify the route prop here
        />
        <PButton
            src={postNoClicked}
            alt="post not clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/posts/feeds")}
            route="/mypage/posts/feeds" // Specify the route prop here
        />
      </ButtonLocation>

      <Style>
        <h3>코디</h3>
        <LikeImage/>
        <h3>숏폼</h3>
        <LikeShort/>
        <h3>Comments</h3>
        
      </Style>
    
    </ProfileLayout>
  </PageStyle>
  
    
    
  );
}

export default MyPage_like;
