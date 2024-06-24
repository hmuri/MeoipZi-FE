import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import axiosInstance from "../api/axios";
import { useState } from "react";

// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}

const Category = () => {
  const location = useLocation();
  const { product } = useParams();
  console.log("location" + JSON.stringify(location));
  const item = location.state?.items;

  const [isScraped, setScraped] = useState(item.scrapOrNot);

  const handleClick = (shopUrl: string) => {
    navigator.clipboard.writeText(shopUrl);
    alert("copied");
  };

  const handleScrap = async () => {
    try {
      const response = await axiosInstance.post(`/products/${product}/scrap`, {
        contentType: "product",
      });
      if (response.status === 200) {
        setScraped(!isScraped); // 요청 성공 시 좋아요 상태 변경
      }
    } catch (error) {
      console.error("Like request failed:", error);
    }
  };

  return (
    <Container>
      <Header></Header>
      <BodyContainer>
        <MainImage src={item.imgUrl} />
        <ControlBar>
          <LeftIcons>
            <ImgCircle />
            <ShopText>{item.shopName}</ShopText>
          </LeftIcons>
          <RightIcons>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => handleClick(item.shopUrl)}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 13M16 8L12 4M12 4L8 8M12 4L12 16"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={handleScrap}
              style={{ cursor: "pointer", fill: isScraped ? "green" : "none" }}
            >
              <path
                d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V21L12 15L6 21V6Z"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RightIcons>
        </ControlBar>
        <ProductInfo>
          {item.title}
          <br />
          <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
            {item.price}원
          </span>
        </ProductInfo>
        <LinkBox href={item.shopUrl}>Go to Webpage</LinkBox>
      </BodyContainer>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  width: 333px;
  height: 812px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 333px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 381px;
  display: flex;
`;
const ControlBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftIcons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
`;

const ImgCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 50%;
`;

const ShopText = styled.div`
  font-size: 13px;
  color: #8d8d8d;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  font-weight: 600;
`;

const LinkBox = styled.a`
  margin-top: 35px;
  text-decoration: none;
  background-color: #8b8b8b;
  border-radius: 4px;
  color: white;
  text-align: center;
  padding: 17px 0;
  font-size: 13px;
`;
