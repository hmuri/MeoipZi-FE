import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getShort } from "../api/product";
import NavBar from "../components/NavBar";
import { useCallback, useEffect, useState } from "react";
import mainLogo from "../images/mainLogo.png";
import alarmLogo from "../images/alarm.png";
import axiosInstance from "../api/axios";
import EditIcon from "../images/edit-1.png";

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
  const [selectedVideoInfo, setSelectedVideoInfo] = useState<any>();

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

  const handleModal = async (video: ImageType) => {
    try {
      const response = await axiosInstance.get(`/shortforms/${video.key}`);
      if (response.status === 200) {
        setIsModal(true);
        setSelectedVideo(video);

        setSelectedVideoInfo(response.data);
      }
    } catch (error) {
      console.error("Like request failed:", error);
    }
  };

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
                handleModal(image);
              }}
            />
          ))}
        </BodyContainer>

        <NavBar />
      </Container>
      {isModal && selectedVideo && selectedVideoInfo && (
        <Modal
          video={selectedVideo}
          videoInfo={selectedVideoInfo}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
};

interface ModalType {
  video: ImageType;
  videoInfo: any;
  setIsModal: any;
}

const Modal = ({ video, videoInfo, setIsModal }: ModalType) => {
  const [liked, setLiked] = useState(false);
  const [isShowProduct, setIsShowProduct] = useState(true);
  const [comments, setComments] = useState<any>();
  const [content, setContent] = useState("");

  const getComments = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/shortforms/${video.key}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error("댓글 요청 실패:", error);
    }
  }, [video.key]); // useCallback의 의존성 배열

  useEffect(() => {
    getComments();
  }, [getComments]);

  const togglePlay = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.stopPropagation();
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleLike = async ({
    id,
    event,
  }: {
    id: number;
    event: React.MouseEvent<SVGSVGElement>;
  }) => {
    event.stopPropagation();
    try {
      const response = await axiosInstance.post(`/shortforms/${id}/like`, {
        contentType: "shortform",
      });
      if (response.status === 200) {
        setLiked(!liked); // 요청 성공 시 좋아요 상태 변경
      }
    } catch (error) {
      console.error("Like request failed:", error);
    }
  };

  const handleClick = ({
    shopUrl,
    event,
  }: {
    shopUrl: string;
    event: React.MouseEvent<SVGSVGElement>;
  }) => {
    event.stopPropagation();
    navigator.clipboard.writeText(shopUrl);
    alert("copied");
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("content", content);

    const entries = Array.from(formData.entries());
    entries.forEach(([key, value]) => {
      console.log(`here${key}: ${value}`);
    });

    try {
      const response = await axiosInstance.post(
        `/shortforms/${video.key}/comments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Comment added successfully:", response.data);
        setComments((comments: any) => [...comments, content]);
        setContent("");
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };
  return (
    <ModalContainer onClick={() => setIsModal(false)}>
      <ModalContent>
        <Video key={video.key} src={video.url} onClick={togglePlay} />
        <RightNavBar>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            onClick={(event) => {
              handleLike({ id: video.key, event });
            }}
            style={{ cursor: "pointer", fill: liked ? "#FF4500" : "none" }}
          >
            <path
              d="M2.3314 9.04738L10 17L17.6686 9.04738C18.5211 8.16332 19 6.96429 19 5.71405C19 3.11055 16.9648 1 14.4543 1C13.2487 1 12.0925 1.49666 11.24 2.38071L10 3.66667L8.75997 2.38071C7.90749 1.49666 6.75128 1 5.54569 1C3.03517 1 1 3.11055 1 5.71405C1 6.96429 1.47892 8.16332 2.3314 9.04738Z"
              stroke={liked ? "none" : "#ffffff"}
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
            fill="none"
            onClick={(event) => {
              event.stopPropagation();
              setIsShowProduct(!isShowProduct);
            }}
            style={{
              cursor: "pointer",
              fill: isShowProduct ? "none" : "gray",
            }}
          >
            <path
              d="M15.5 11.5H15.51M11.5 11.5H11.51M7.5 11.5H7.51M15.3 19.1L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1Z"
              stroke="#ffffff"
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
            fill="none"
            onClick={(event) =>
              handleClick({ shopUrl: videoInfo.imgUrl, event })
            }
            style={{ cursor: "pointer" }}
          >
            <path
              d="M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 13M16 8L12 4M12 4L8 8M12 4L12 16"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </RightNavBar>
        {!isShowProduct && comments !== undefined && (
          <CommentContainer>
            <CommentBox>
              <div>
                {comments.map((comment: any, index: string) => (
                  <div
                    key={index}
                    style={{
                      padding: "20px 10px 15px 10px",
                      borderBottom: "0.5px solid #ffffff",
                    }}
                  >
                    <h4>{comment.nickname}</h4>
                    <p style={{ fontSize: "13px" }}>{comment.content}</p>
                    <small>{comment.createdAt}</small>
                  </div>
                ))}
              </div>
            </CommentBox>
            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "40px",
                padding: "10px 20px",
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                position: "fixed",
                bottom: 20,
                width: "calc(100% - 40px)",
                left: 20,
                backgroundColor: "white",
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <input
                type="text"
                value={content}
                onChange={handleInputChange}
                placeholder="Add a comment..."
                required
              />
              <button type="submit">
                <img src={EditIcon} />
              </button>
            </form>
          </CommentContainer>
        )}
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
  position: relative;
`;

const Video = styled.video`
  width: 90%;
  height: 90%;
  display: flex;
  cursor: pointer;
`;

const RightNavBar = styled.div`
  display: flex;
  position: absolute;
  right: 40px;
  bottom: 250px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const CommentBox = styled.div`
  dispaly: flex;
  padding: 0 10px;
  width: 100%;
  color: white;
  height: 140px;
  overflow: auto;
`;

const CommentContainer = styled.div`
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0px;
  padding-top: 20px;
  padding-bottom: 95px;
`;
