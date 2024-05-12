import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../api/product";
import NavBar from "../components/NavBar";

// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}

// 아이템 배열의 요소 타입

const Category = () => {
  const location = useLocation();
  const rawItems = location.state?.items;
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleImageClick = (id: number) => {
    queryClient
      .fetchQuery(["productItem", id], () => getItem(id))
      .then((data) => {
        console.log("data" + data);
        navigate(`/outfit/${id}`, { state: { items: data } });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };

  const images =
    rawItems?.flatMap((group: any) => {
      const result: ImageType[] = [];
      for (let i = 0; i < group.length; i += 2) {
        if (typeof group[i] === "number" && typeof group[i + 1] === "string") {
          result.push({
            key: group[i] as number,
            url: group[i + 1] as string,
          });
        }
      }
      return result;
    }) ?? [];

  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <Input value={categoryName} />
      </SearchBox>
      <BodyContainer>
        {images.map((image: ImageType) => (
          <Image
            key={image.key}
            src={image.url}
            alt={`Image ${image.key}`}
            onClick={() => handleImageClick(image.key)}
          />
        ))}
      </BodyContainer>
      <NavBar />
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
`;
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
`;
