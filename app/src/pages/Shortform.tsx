import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getShort } from "../api/product";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import mainLogo from "../images/mainLogo.png";
import alarmLogo from "../images/alarm.png";

// 이미지 객체를 위한 타입 정의
interface ImageType {
  key: number;
  url: string;
}

// 아이템 배열의 요소 타입

const Category = () => {
  const [rawItems, setData] = useState([]);
  // 로딩 상태를 관리할 상태 생성
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ImageType>();

  useEffect(() => {
    // 데이터 로딩 함수
    const fetchData = async () => {
      setIsLoading(true); // 로딩 상태 시작
      try {
        const result = await getShort(); // 비동기 함수 호출
        setData(result); // 결과를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // 에러 발생 시 데이터를 null로 설정
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    fetchData(); // 함수 실행
  }, []);

  const navigate = useNavigate();

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

  console.log(isModal);

  return (
    <>
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
              onClick={() => {
                setIsModal(true);
                setSelectedVideo(image);
              }}
            />
          ))}
        </BodyContainer>

        <NavBar />
      </Container>
      {isModal && <Modal videos={images} />}
    </>
  );
};

interface ModalType {
  videos: ImageType[];
}

const Modal = ({ videos }: ModalType) => {
  const togglePlay = (event: React.MouseEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <ModalContainer>
      <ModalContent>
        {videos.map((image: ImageType) => (
          <Video key={image.key} src={image.url} onClick={togglePlay} />
        ))}
        <RightNavBar></RightNavBar>
      </ModalContent>
    </ModalContainer>
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

const Image = styled.video`
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

const LogoImage = styled.img`
  width: 109px;
  height: 53px;
`;

const AlarmImage = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const ModalContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 0px;
  gap: 18px;
  overflow: auto;
`;

const Video = styled.video`
  width: 90%;
  height: 90%;
  display: flex;
  position: relative;
  cursor: pointer;
`;

const RightNavBar = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  gap: 15px;
`;
