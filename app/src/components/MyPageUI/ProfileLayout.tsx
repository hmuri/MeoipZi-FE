import React, { ReactNode } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import Footer from "../Footer";
import Header from "../Header";

import MainHeader from "../../components/mainpageUI/MainHeader";
import MainPgTab from "../mainpageUI/MainPgTab";
import ProfileInfo from "./ProfileInfo";



//import CommunityTab from "./CommunityTab";

interface LayoutProps {
  children: ReactNode;
}

const StyleWrap = styled.div`
  margin-top: 380px;
  margin-bottom: 60px;
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
const Box = styled.div`
  background-color:#fff;
  position: fixed;
  z-index: 999;
`
const Banner = styled.div`
background-color: #fff;
color: #333;
padding: '20px 0';
margin-top: 30px;
left: 50%;
width: 400px;
transform: translate(-50%, -50%);
position: fixed;
z-index: 100;
display: flex; /* Add display flex */
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  flex: auto;
  z-index:0;
`;

function ProfileLayout(props: LayoutProps): JSX.Element {

  return (
    <div>
      <Box>
      <Banner>
        <h4>마이페이지</h4>
      </Banner>
      <ProfileInfo />
      </Box>
      <StyleWrap id="wrap">
        <ContentWrapper>
          <main>{props.children}</main>
        </ContentWrapper>
      </StyleWrap>
      <Footer />
    </div>
  );
}

export default ProfileLayout;
