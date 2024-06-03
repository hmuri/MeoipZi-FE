import styled from "styled-components";
import searchIcon from "../images/searchIcon.png";
import { Router, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import {
  getBrandItems,
  getCategoryItems,
  getGenreItems,
} from "../api/category";
import NavBar from "../components/NavBar";

const Search = () => {
  const categories = ["상의", "하의", "원피스", "아우터"];
  const brands = [
    "나이키",
    "타미진스",
    "구찌",
    "챔피온",
    "칼하트",
    "A.P.C",
    "입생로랑",
    "라코스테",
    "폴로랄프로렌",
    "타미힐피거",
    "지고트",
    "M'S GRACY",
    "엠포리오",
    "VTZ",
    "어널로이드",
    "비바스튜디오",
    "자라",
  ];
  const genres = [
    { id: 1, name: "Y2K" },
    { id: 2, name: "클래식" },
    { id: 3, name: "캐주얼" },
    { id: 4, name: "스포티" },
    { id: 5, name: "스트릿" },
    { id: 6, name: "페미닌" },
    { id: 7, name: "아메카지" },
    { id: 8, name: "비즈니스" },
    { id: 9, name: "빈티지" },
  ];
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCategoryClick = (category: string) => {
    queryClient
      .fetchQuery(["categoryItems", category], () => getCategoryItems(category))
      .then((data) => {
        console.log("data" + data);
        navigate(`/category/${category}`, {
          state: { items: data, category: "category" },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };
  const handleBrandClick = (category: string) => {
    queryClient
      .fetchQuery(["brandItems", category], () => getBrandItems(category))
      .then((data) => {
        navigate(`/category/${category}`, {
          state: { items: data, category: "brand" },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };
  const handleGenreClick = (genre: any) => {
    queryClient
      .fetchQuery(["genreItems", genre.id], () => getGenreItems(genre.id))
      .then((data) => {
        navigate(`/category/${genre.name}`, {
          state: { items: data, category: "genre" },
        });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };
  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <img src={searchIcon} />
        <Input placeholder="스타일, 아이템, 브랜드 등" />
      </SearchBox>
      <BodyContainer>
        <Label>카테고리 검색</Label>
        <Slider>
          {categories.map((category) => (
            <CategoryBox
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              <CategoryTitle>{category}</CategoryTitle>
            </CategoryBox>
          ))}
        </Slider>
        <Label>브랜드 검색</Label>
        <Slider>
          {brands.map((brand) => (
            <CategoryBox key={brand} onClick={() => handleBrandClick(brand)}>
              <CategoryTitle>{brand}</CategoryTitle>
            </CategoryBox>
          ))}
        </Slider>
        <Label>장르별 검색</Label>
        <Slider>
          {genres.map((genre) => (
            <CategoryBox key={genre.id} onClick={() => handleGenreClick(genre)}>
              <CategoryTitle>{genre.name}</CategoryTitle>
            </CategoryBox>
          ))}
        </Slider>
      </BodyContainer>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100%;
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
  margin-bottom: 15px;
  margin-top: 30px;
`;
const Slider = styled.div`
  overflow: auto;
  width: 365px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; // Hide scrollbar for Firefox
  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for Chrome, Safari, Opera
  }
`;

const CategoryBox = styled.div`
  display: inline-block;
  gap: 20px;
  width: 72px;
  height: 72px;
  background-color: #8b8b8b;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;
`;

const CategoryTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
`;
