import React, { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

import MainHeader from "../components/mainpageUI/MainHeader";
import CommunityTab from "./CommunityTab";
import NavBar from "./NavBar";
//import CommunityTab from "./CommunityTab";

interface LayoutProps {
  children: ReactNode;
}

const StyleWrap = styled.div`
  margin-top: 300px;
  margin-bottom: 1vh;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  flex-direction: column;
  width: 56vh;
  justify-content: space-between;
  min-height: 100%;
  overflow: hidden;

  background-color: white;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

function Layout(props: LayoutProps): JSX.Element {
  return (
    <div>
      <MainHeader />
      <CommunityTab />
      <StyleWrap id="wrap">
        <ContentWrapper>
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
    </div>
  );
}

export default Layout;
