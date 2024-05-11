
import { useLocation, useParams } from "react-router-dom";
import styled from 'styled-components';


// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}


const Category = () => {
  const location = useLocation();
  const item = location.state?.items;
  const { categoryName } = useParams();

  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <Input value={categoryName}/>
      </SearchBox>
      <BodyContainer>
        
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
  justify-content: center;
  margin: 20px;
`;

const Title = styled.div`
  position: absolute;
  top: 46px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #464646;

  text-align: center;
  font-family: "Noto Sans Arabic";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 15px */
  letter-spacing: -0.15px;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(164, 164, 164, 0.51);
  position: absolute;
  top: 90px;
`;
const Input = styled.input`
  width: 100%;
`
const BodyContainer = styled.div`
  display: flex;
  width: 333px;
  gap: 15px;
  position: absolute;
  top: 140px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Image = styled.img`
display: flex;
width: 159px;
height: 159px;
`