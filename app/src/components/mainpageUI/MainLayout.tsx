import React, { ReactNode } from "react";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";

import MainHeader from "../../components/mainpageUI/MainHeader";
import MainPgTab from "../mainpageUI/MainPgTab";
import HorizontalScroll from "./HorizontalScroll";
import TimerScroll from "./TimerScroll";
//import CommunityTab from "./CommunityTab";

interface LayoutProps {
  children: ReactNode;
}

const StyleWrap = styled.div`
  margin-top: 600px;
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
`;

function MainLayout(props: LayoutProps): JSX.Element {
  return (
    <div>
      <MainHeader />
      <MainPgTab />
      <StyleWrap id="wrap">
        <ContentWrapper>
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
      <Footer />
    </div>
  );
}

export default MainLayout;
