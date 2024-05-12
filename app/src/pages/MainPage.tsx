import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import HorizontalScroll from "../components/mainpageUI/HorizontalScroll";
import TimerScroll from "../components/mainpageUI/TimerScroll";
import VerticalImageGrid from "../components/mainpageUI/VerticalImageGrid";
import MainLayout from "../components/mainpageUI/MainLayout";

interface MainPageProps {}

interface StyleListItem {
  imgUrl: string;
}

interface Partner {
  id: string;
  imageUrl: string;
}

const ContentContainer = styled.div`
  margin-top: 400px; /* Push all content down by 200px */
`;

const StyledHorizontalScroll1 = styled(HorizontalScroll)`
  
`;

const StyledHorizontalScroll = styled(HorizontalScroll)`
  margin-top: 10px;
  height: 90px;
  margin: 0px;
`;

const StyledContainer = styled.div`
  margin-top: 20px;
`;

const LetterSyle = styled.div`
  font-weight: 650;
  font-size: 15px;
  font-style: Noto Sans Arabic;
  color: #5c5c5c;
`;

const MainPage: React.FC = () => {
  const [vintageNewsList, setVintageNewsList] = useState<any[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [styleList, setStyleList] = useState<StyleListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/meoipzi`);
        const data = response.data;
        setVintageNewsList(data.vintageNewsList);
        setPartnersList(data.partnersList);
        setStyleList(data.styleList.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <ContentContainer>
        <StyledContainer>
          <LetterSyle>Today 빈티지 소식</LetterSyle>
          <StyledHorizontalScroll1 imageUrls={vintageNewsList.map(item => item.imageUrl)} />
        </StyledContainer>
        <StyledContainer>
        <LetterSyle>Partners</LetterSyle>
          <StyledHorizontalScroll imageUrls={partnersList.map(partner => partner.imageUrl)} />
        </StyledContainer>
        <StyledContainer>
          <LetterSyle>style</LetterSyle>
          <VerticalImageGrid images={styleList.map(item => item.imgUrl)} />
        </StyledContainer>
      </ContentContainer>
    </MainLayout>
  );
};

export default MainPage;

