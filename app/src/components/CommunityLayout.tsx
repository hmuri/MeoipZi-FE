import React, { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";

import MainHeader from "./mainpageUI/MainHeader";
import MainPgTab from "./mainpageUI/MainPgTab";
import CommunityTab from "./CommunityTab";
import WritePost from "../pages/WritePost";

//add button to writePost
import writeButton from "../images/WritePostB.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";

//import CommunityTab from "./CommunityTab";

interface LayoutProps {
  children: ReactNode;
  currentPath: string;
}

const StyleWrap = styled.div`
  margin-top: 95vh;
  margin-bottom: 1vh;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  flex-direction: column;
  /* Adjust the width to ensure it accommodates the contents without cropping */
  /* width: 56vh; */
  justify-content: space-between;
  min-height: 100%;
  overflow: hidden;

  background-color: white;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding-top: 20px; /* Add padding-top to create space below the CommunityTab */
`;

const WriteButton = styled.img`
  width: 80px;
  position: fixed;
  left: 58%;
  top: 70%;
  cursor: pointer; /* Add cursor pointer */
`;

function ComLayout(props: LayoutProps): JSX.Element {
  const { currentPath } = props;
  const location = useLocation();

  return (
    <div>
      <MainHeader />
      <MainPgTab />
      <CommunityTab/>
      <StyleWrap id="wrap">
        <ContentWrapper>
          
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
      {location.pathname === "/WritePost" ? (
            <WritePost currentPath={currentPath} />
          ) : (
            <Link to={`${currentPath}/WritePost`}>
              <WriteButton src={writeButton} alt="Write Post" />
            </Link>
          )}
          <Routes>
          <Route path={`${currentPath}/WritePost`} element={<WritePost currentPath={currentPath} />} />
          </Routes>
        <Footer />
    </div>
  );
}

export default ComLayout;