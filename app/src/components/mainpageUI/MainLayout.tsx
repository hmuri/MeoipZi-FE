import React, { ReactNode } from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import NavBar from "../NavBar";
import MainHeader from "../../components/mainpageUI/MainHeader";
import MainPgTab from "../mainpageUI/MainPgTab";
import HorizontalScroll from "./HorizontalScroll";
import TimerScroll from "./TimerScroll";
//import CommunityTab from "./CommunityTab";

interface LayoutProps {
  children: ReactNode;
}

const StyleWrap = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  margin-left: 5px;
  max-width: 1200px;
  flex: 1;
`;

const MainLayoutWrapper = styled.div`
  position: relative;
  padding-bottom: 76px; /* Height of NavBar + some margin */
`;

const Container = styled.div`
  width: 100%;
  height: 812px;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

function MainLayout(props: LayoutProps): JSX.Element {
  return (
    <Container>
      
      <MainHeader />
      <MainPgTab />
      <StyleWrap id="wrap">
        <ContentWrapper>
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
      <NavBar />
    
    </Container>
    
  );
}

export default MainLayout;