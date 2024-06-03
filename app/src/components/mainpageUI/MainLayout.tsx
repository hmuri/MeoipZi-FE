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
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 100px;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
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
    </Container>
  );
}

export default MainLayout;
