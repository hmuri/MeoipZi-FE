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
margin-left: 20px;
margin-top:20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 400px;
min-height: 50vh; /* Adjust this as needed */

`;

const ContentWrapper = styled.div`
width: 100%;
margin-left: 5px;
max-width: 1200px;
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
