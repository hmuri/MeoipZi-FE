import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import HorizontalScroll from "../components/mainpageUI/HorizontalScroll";
import VerticalImageGrid from "../components/mainpageUI/VerticalImageGrid";
import MainLayout from "../components/mainpageUI/MainLayout";
import VintageComp from "../components/mainpageUI/VintageComp";
import NavBar from "../components/NavBar";

interface MainPageProps {}

interface VintageNewsItem {
  imgUrl: string;
}

interface Partner {
  shopUrl: string;
  imgUrl: string;
}
const StyledHorizontalScroll = styled(HorizontalScroll)`
  margin-top: 15px;
  height: 90px;
  margin: 0px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

const LetterStyle = styled.div`
  font-weight: 650;
  font-size: 17px;
  font-style: Noto Sans Arabic;
  color: #5c5c5c;
`;

const MainPage: React.FC<MainPageProps> = () => {
  const [vintageNewsList, setVintageNewsList] = useState<VintageNewsItem[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [styleList, setStyleList] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_BASE_URL}/meoipzi`
        );
        const data = response.data;

        console.log("Fetched data:", data); // Add this line

        setVintageNewsList(data.vintageNewsList);
        setPartnersList(data.partnersList);
        setStyleList(
          data.styleList.content.map((item: { imgUrl: string }) => item.imgUrl)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <StyledContainer>
        <LetterStyle>Today 빈티지 소식</LetterStyle>
        <VintageComp imageUrls={vintageNewsList.map((item) => item.imgUrl)} />
      </StyledContainer>
      <StyledContainer>
        <LetterStyle>Partners</LetterStyle>
        <StyledHorizontalScroll
          dataList={partnersList.map((partner) => ({
            imgUrl: partner.imgUrl,
            shopUrl: partner.shopUrl,
          }))}
        />
      </StyledContainer>
      <StyledContainer>
        <LetterStyle>Style</LetterStyle>
        <VerticalImageGrid images={styleList} />
      </StyledContainer>
    </MainLayout>
  );
};

export default MainPage;
