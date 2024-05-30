import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import MainHeader from "./mainpageUI/MainHeader";
import MainPgTab from "./mainpageUI/MainPgTab";
import CommunityTab from "./CommunityTab";
import WritePost from "../pages/WritePost";
import writeButton from "../images/WritePostB.png";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

interface LayoutProps {
  children: ReactNode;
  currentPath: string;
  totalElements: number; // Add totalElements prop
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-bottom: 80px; // Add padding bottom for NavBar
`;

const StyleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-top:50vh;
  position: sticky; /* 페이지가 화면의 상단에 고정되도록 설정 */
  top: 0; /* 화면의 상단에 고정 */
`;

const ContentWrapper = styled.div<{ marginTop: number; maxHeight: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  top:0;
  margin-top: ${({ marginTop }) => `${marginTop}px`}; // Dynamically adjust margin-top
  overflow-y: auto; // Add this to enable vertical scrolling if needed

`;

const WriteButton = styled.img`
  width: 80px;
  position: fixed;
  left: 70%;
  transform: translateX(-50%);
  top: 70%;
  cursor: pointer;
  z-index: 1000; // Ensure button is on top
`;

function ComLayout(props: LayoutProps): JSX.Element {
  const { currentPath, totalElements } = props;
  const location = useLocation();

  // Calculate the number of posts based on totalElements
  const numPosts = totalElements > 0 ? totalElements : 10; // Default to 10 if totalElements is not available

  // Calculate the margin-top based on the number of posts
  let marginTop = 0;
  if (numPosts < 5) {
    marginTop = 5 * window.innerHeight; // Set marginTop to 200vh if less than 5 elements
  } else {
    marginTop = numPosts * 80; // Adjust based on your post item height
  }

  // Set a maximum height for the content area
  const maxContentHeight = 3000; // Adjust as needed

  return (
    <Container>
      <MainHeader />
      <MainPgTab />
      <CommunityTab />
      <StyleWrap id="wrap">
        <ContentWrapper marginTop={marginTop} maxHeight={maxContentHeight}>
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
      {location.pathname === `${currentPath}/WritePost` ? (
        <WritePost currentPath={currentPath} />
      ) : (
        <Link to={`${currentPath}/WritePost`}>
          <WriteButton src={writeButton} alt="Write Post" />
        </Link>
      )}
      <Routes>
        <Route
          path={`${currentPath}/WritePost`}
          element={<WritePost currentPath={currentPath} />}
        />
      </Routes>
      <NavBar />
    </Container>
  );
}

export default ComLayout;
