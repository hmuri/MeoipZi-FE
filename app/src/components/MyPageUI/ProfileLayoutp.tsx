import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Footer from "../Footer";
import ProfileInfo from "./ProfileInfo";
import PButton from "./PButton";
import likeClicked from "../../images/likeClicked.png";
import likeNoClicked from "../../images/likeNoClicked.png";
import postClicked from "../../images/postClicked.png";
import postNoClicked from "../../images/postNoClicked.png";
import LikeComments from "./LikeComment";
import NavBar from "../NavBar";

interface LayoutProps {
  children?: ReactNode;
}

const StyleWrap = styled.div`
  margin-top: 380px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh; /* Set minimum height to 100% of viewport height */
  overflow: hidden;
  background-color: white;
  position: relative; /* Ensure relative positioning for absolute children */
`;

const Box = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 375px; /* Set the width to match the footer */
  z-index: 999;
  left: 50%; /* Center the box horizontally */
  transform: translateX(-50%); /* Center the box horizontally */
`;

const Banner = styled.div`
  background-color: #fff;
  color: #333;
  padding: "20px 0";
  margin-top: 30px;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  flex: auto;
  z-index: 0;
`;

const ButtonLocation = styled.div`
  background: #ececec;
  position: relative;
  top: 180px; /* Set distance from the top */
  margin: auto; /* Center horizontally */
  height: 40px;
  max-width: 330px; /* Set maximum width */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

function ProfileLayout({ children }: LayoutProps): JSX.Element {
  const navigate = useNavigate();

  const handleLikeClick = (route: string) => {
    // Navigate to the specified route
    navigate(route);
  };

  return (
    <StyleWrap>
      <Box>
        <Banner>
          <h4>마이페이지</h4>
        </Banner>
        <ProfileInfo />
        <ButtonLocation>
          <PButton
            src={likeNoClicked}
            alt="like not clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/likes")}
            route="/mypage/likes" // Specify the route prop here
          />
          <PButton
            src={postClicked}
            alt="post clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/posts/feeds")}
            route="/mypage/posts/feeds" // Specify the route prop here
          />
        </ButtonLocation>
      </Box>
      <ContentWrapper>
        <main>{children}</main>
      </ContentWrapper>
    </StyleWrap>
  );
}

export default ProfileLayout;
