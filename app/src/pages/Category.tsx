import { useLocation, useParams } from "react-router-dom";
import styled from 'styled-components';

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
  console.log('category' + categoryName)
  const images = rawItems?.flatMap((group: any) => {
    const result: ImageType[] = [];
    for (let i = 0; i < group.length; i += 2) {
      if (typeof group[i] === 'number' && typeof group[i + 1] === 'string') {
        result.push({
          key: group[i] as number,
          url: group[i + 1] as string
        });
      }
    }
    return result;
  }) ?? [];

  return (
    <Container>
      <Title>검색하기</Title>
      <SearchBox>
        <Input value={categoryName}/>
      </SearchBox>
      <div>
        {images.map((image: ImageType) => (
          <div key={image.key}>
            <img src={image.url} alt={`Image ${image.key}`} />
            <p>Key: {image.key}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Category;


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
const Input = styled.input`
  width: 100%;
`
