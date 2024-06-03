import { useQueryClient } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem, getProductItem } from "../api/product";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import EditIcon from "../images/edit-1.png";
import NavBar from "../components/NavBar";

interface Comment {
  nickname: string;
  contents: string;
  createdAt: string;
  content: string;
}

const Outfit = () => {
  const location = useLocation();
  const item = location.state?.items;
  const products = item.productListResponseDTOS;
  const { outfit } = useParams();
  const [isShowProduct, setIsShowProduct] = useState(true);
  const [comments, setComments] = useState<Comment[]>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(item.likeOrNot);
  const [content, setContent] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    console.log();
    const formData = new FormData(form);
    formData.append("content", content);

    const entries = Array.from(formData.entries());
    entries.forEach(([key, value]) => {
      console.log(`here${key}: ${value}`);
    });

    try {
      const response = await axiosInstance.post(
        `/outfits/${outfit}/comments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Comment added successfully:", response.data);
        setContent(""); // 입력 필드 초기화
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleClick = (shopUrl: string) => {
    navigator.clipboard.writeText(shopUrl);
    alert("copied");
  };

  const handleImageClick = (id: number) => {
    queryClient
      .fetchQuery(["productItem", id], () => getProductItem(id))
      .then((data) => {
        console.log("data" + data);
        navigate(`/product/${id}`, { state: { items: data } });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(`/outfits/${outfit}/like`, {
        contentType: "outfit",
      });
      if (response.status === 200) {
        setLiked(!liked); // 요청 성공 시 좋아요 상태 변경
      }
    } catch (error) {
      console.error("Like request failed:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axiosInstance.get(`/outfits/${outfit}/comments`);
      setComments(response.data);
      console.log("comment " + JSON.stringify(comments));
    } catch (error) {
      console.error("Like request failed:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [outfit, isShowProduct]);

  return (
    <Container>
      <Header></Header>
      <BodyContainer>
        <MainImage src={item.imgUrl} />
        <ControlBar>
          <LeftIcons>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              onClick={handleLike}
              style={{ cursor: "pointer", fill: liked ? "red" : "none" }}
            >
              <path
                d="M2.3314 9.04738L10 17L17.6686 9.04738C18.5211 8.16332 19 6.96429 19 5.71405C19 3.11055 16.9648 1 14.4543 1C13.2487 1 12.0925 1.49666 11.24 2.38071L10 3.66667L8.75997 2.38071C7.90749 1.49666 6.75128 1 5.54569 1C3.03517 1 1 3.11055 1 5.71405C1 6.96429 1.47892 8.16332 2.3314 9.04738Z"
                stroke="#5C5C5C"
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
              onClick={() => setIsShowProduct(!isShowProduct)}
              style={{
                cursor: "pointer",
                fill: isShowProduct ? "none" : "gray",
              }}
            >
              <path
                d="M15.5 11.5H15.51M11.5 11.5H11.51M7.5 11.5H7.51M15.3 19.1L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1Z"
                stroke="#5C5C5C"
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
              onClick={() => handleClick(item.shopUrl)}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18L4 13M16 8L12 4M12 4L8 8M12 4L12 16"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </LeftIcons>
          <RightIcons>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V21L12 15L6 21V6Z"
                stroke="#5C5C5C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </RightIcons>
        </ControlBar>
        {isShowProduct ? (
          <div style={{ width: "100%" }}>
            {products.map((product: any) => (
              <ProductCard
                key={product.productId}
                onClick={() => handleImageClick(product.productId)}
              >
                <ProductImage src={product.imgUrl} alt={product.title} />
                <ProductInfo>
                  <div>
                    <h2 style={{ fontSize: "13px", fontWeight: "600" }}>
                      {product.title}
                    </h2>
                    <p style={{ fontSize: "13px" }}>{product.price}원</p>
                  </div>
                </ProductInfo>
              </ProductCard>
            ))}
          </div>
        ) : (
          comments !== undefined && (
            <>
              <CommentBox>
                <div>
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "10px",
                      }}
                    >
                      <h4>{comment.nickname}</h4>
                      <p style={{ fontSize: "13px" }}>{comment.content} ..</p>
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
            </>
          )
        )}
      </BodyContainer>
    </Container>
  );
};

export default Outfit;

const Container = styled.div`
  width: 100%;
  height: 812px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 333px;
  padding-bottom: 50px;
  margin: 0 20px;
`;

const MainImage = styled.img`
  width: 100%;
  height: 381px;
  display: flex;
`;
const ControlBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftIcons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
`;

const ProductCard = styled.div`
  width: 100%;
  height: 71px;
  display: flex;
  border: 1px solid #d9d9d9;
  margin-bottom: 8px;
  border-radius: 11px;
`;

const ProductImage = styled.img`
  width: 78px;
  height: 100%;
`;
const ProductInfo = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const CommentBox = styled.div`
  dispaly: flex;
  width: 100%;
  height: 300px;
  overflow: auto;
`;
