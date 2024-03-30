import React, { FC } from "react";
import styled from "styled-components";
import HorizontalScroll from "../components/mainpageUI/HorizontalScroll";
import TimerScroll from "../components/mainpageUI/TimerScroll";
import VerticalImageGrid from "../components/mainpageUI/VerticalImageGrid";
import MainLayout from "../components/mainpageUI/MainLayout";
interface MainPageProps {}

const ContentContainer = styled.div`
  margin-top: 400px; /* Push all content down by 200px */
`;

const StyledTimerScroll = styled(TimerScroll)`
  
  z-index: 50;
`;

const StyledHorizontalScroll = styled(HorizontalScroll)`
  margin-top: 10px;
  height: 90px;
  margin: 0px;
`;

const StyledContainer = styled.div`
  margin-top: 20px;
`

const LetterSyle = styled.div`
font-weight: 650;
font-size: 15px;
font-style: Noto Sans Arabic;
color: #5C5C5C

`;
const MainPage: React.FC = () => {
  return (
    <MainLayout>
      <ContentContainer>
      <StyledContainer>
        <LetterSyle>Today 빈티지 소식</LetterSyle>
        <StyledTimerScroll />
      </StyledContainer>
      <StyledContainer>
        <LetterSyle>Partenrs</LetterSyle>
        <StyledHorizontalScroll/>
      </StyledContainer>
      <StyledContainer>
        <LetterSyle>style</LetterSyle>
        <VerticalImageGrid/>
      </StyledContainer>
      
      {/* Other content */}
      </ContentContainer>
    </MainLayout>

    
    
    
  );
};

export default MainPage;
