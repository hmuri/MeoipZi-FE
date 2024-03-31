import styled from "styled-components";

const Search = () => {
  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <input placeholder="스타일, 아이템, 브랜드 등" />
      </SearchBox>
      <BodyContainer>
        <Label>카테고리 검색</Label>
        <Slider>
          <CategoryBox>
            <CategoryTitle>상의</CategoryTitle>
          </CategoryBox>
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
  justify-content: space-between;
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
  height: 75px;
  display: flex;
  margin-bottom: 41px;
`;

const CategoryBox = styled.div`
  width: 72px;
  height: 72px;
  background-color: #8b8b8b;
  border-radius: 100%;
`;

const CategoryTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  text-align: right;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
