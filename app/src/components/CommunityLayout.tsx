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
  align-items: center;
  padding-bottom: 80px; // Add padding bottom for NavBar
`;

const StyleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 25vh;
`;

const ContentWrapper = styled.div<{ marginTop: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.marginTop}px; // Dynamically adjust margin-top
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
  const baseMarginTop = 120;
  const marginTop = baseMarginTop + (numPosts * 80);

  return (
    <Container>
      <MainHeader />
      <MainPgTab />
      <CommunityTab />
      <StyleWrap id="wrap">
        <ContentWrapper marginTop={marginTop}>
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

