import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getShort } from "../api/product";
import mainLogo from "../images/mainLogo.png";
import alarmLogo from "../images/alarm.png";
import { useEffect, useState } from "react";
import { fetchLatestShortforms } from "../supabse/apis";

// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}

interface Shortform {
  id: number;
  title: string;
  imgUrl: string;
  contents: string;
  createdAt: string;
  updatedAt?: string;
}

interface FetchResponse {
  data?: Shortform[];
  error?: any;
}

// 아이템 배열의 요소 타입

const Shortform = () => {
  const location = useLocation();
  const [shortforms, setShortforms] = useState<Shortform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShortforms = async () => {
      setLoading(true);
      const response = await fetchLatestShortforms();
      if (response.error) {
        console.error("Error fetching latest shortforms:", response.error);
        setError(response.error);
        setLoading(false);
        return;
      }
      setShortforms(response.data || []); // data가 undefined일 경우 빈 배열을 사용
      setLoading(false);
    };

    loadShortforms();
  }, []);
  console.log(shortforms);
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

  return (
    <Container>
      <StyleHeader>
        <LogoImage src={mainLogo} alt="MeoipZi" />
        <AlarmImage src={alarmLogo} alt="bell-image" />
      </StyleHeader>
      <BodyContainer>
        {shortforms.map((shortform: Shortform) => (
          <Image
            key={shortform.id}
            src={shortform.imgUrl}
            alt={`Image ${shortform.id}`}
            onClick={() => handleImageClick(shortform.id)}
          />
        ))}
      </BodyContainer>
    </Container>
  );
};

export default Shortform;

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
  height: 267px;
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
