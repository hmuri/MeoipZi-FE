import styled from "styled-components";
import searchIcon from '../images/searchIcon.png'
import { Router, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getCategoryItems } from "../api/category";

const Search = () => {
  const categories = ['상의', '하의', '모자', '액세서리']; 
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCategoryClick = (category : string) => {
    queryClient.fetchQuery(['categoryItems', category], () => getCategoryItems(category))
    .then(data => {
      navigate(`/category/${category}`, { state: { items: data } });
    })
    .catch(error => {
      console.error('Failed to fetch category items:', error);
    });
};
  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <img src={searchIcon}/>
        <Input placeholder="스타일, 아이템, 브랜드 등" />
      </SearchBox>
      <BodyContainer>
        <Label>카테고리 검색</Label>
        <Slider>
        {categories.map((category) => (
        <CategoryBox key={category} onClick={() => handleCategoryClick(category)}>
          <CategoryTitle>{category}</CategoryTitle>
        </CategoryBox>
      ))}
        </Slider>
        <Label>브랜드 검색</Label>
        <Slider>
          <CategoryBox>
            <CategoryTitle>상의</CategoryTitle>
          </CategoryBox>
        </Slider>
        <Label>장르별 검색</Label>
        <Slider>
          <CategoryBox>
            <CategoryTitle>상의</CategoryTitle>
          </CategoryBox>
        </Slider>
      </BodyContainer>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100%;
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
  gap: 10px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(164, 164, 164, 0.51);
  position: absolute;
  top: 90px;
`;

const BodyContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  position: absolute;
  top: 240px;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  display: flex;
  width: 100%;
  color: #464646;
  text-align: left;
  font-family: "Noto Sans Arabic";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 27px;
`;
const Slider = styled.div`
  overflow-x: auto;
  display: flex;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;  // Hide scrollbar for Firefox
  &::-webkit-scrollbar {
    display: none;  // Hide scrollbar for Chrome, Safari, Opera
  }
`;

const CategoryBox = styled.div`
  display: inline-block;
  width: 72px;
  height: 72px;
  background-color: #8b8b8b;
  border-radius: 100%;
  margin-right: 20px;
  cursor: pointer;
`;

const CategoryTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
`
