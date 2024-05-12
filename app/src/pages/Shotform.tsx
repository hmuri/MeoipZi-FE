import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getShort } from "../api/product";
import mainLogo from "../images/mainLogo.png";
import alarmLogo from "../images/alarm.png";

// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}

// 아이템 배열의 요소 타입

const Shotform = () => {
  const location = useLocation();

  const data = getShort();
  console.log(data);
  const rawItems = location.state?.items;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleImageClick = (id: number) => {
    queryClient
      .fetchQuery(["productItem", id], () => getItem(id))
      .then((data) => {
        console.log("data" + data);
        navigate(`/product/${id}`, { state: { items: data } });
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
      <StyleHeader>
        <LogoImage src={mainLogo} alt="MeoipZi" />
        <AlarmImage src={alarmLogo} alt="bell-image" />
      </StyleHeader>
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
    </Container>
  );
};

export default Shotform;

const Container = styled.div`
  width: 333px;
  height: 812px;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px;
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

const StyleHeader = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 86px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img``;

const AlarmImage = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
`;
