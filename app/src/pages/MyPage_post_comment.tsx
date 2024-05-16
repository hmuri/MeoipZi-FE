import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import PostShort from "../components/MyPageUI/PostShort";
import PButton from "../components/MyPageUI/PButton";
import likeNoClicked from "../images/likeNoClicked.png";
import postClicked from "../images/postClicked.png";

import MyPageTab from "../components/MyPageUI/MyPageTab";
import PostFeed from "../components/MyPageUI/PostFeed";
import PostScrap from "../components/MyPageUI/PostScrap";
import PostComment from "../components/MyPageUI/PostComment";
import ProfileLayout from "../components/MyPageUI/ProfileLayoutp";
import axiosInstance from "../api/axios";


const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Add this line */
`;

const BottomRectangle = styled.div`
  width: 375px;
  height: 2px;
  background-color: #ececec;
  margin-top: auto; /* Push the rectangle to the bottom */
`;

const ButtonLocation = styled.div`
  background: #ececec;
  height: 40px;
  width: 330px;
  display: flex; /* Add display flex */
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  border-radius: 5px;
`;
const ScrollableContainer = styled.div`
  position: fixed;
  top: 110px; /* Adjust this value to set the distance from the top */
  left: 50%;
  transform: translateX(-50%);
  width: 90%; /* Adjust the width as needed */
  max-width: 375px; /* Set a maximum width */
  bottom: 0;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 130px;
  margin-left: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPage_post_comment: FC<{ component?: React.ReactNode }> = ({ component }) => {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState<string>("");
  const [uploadedSFList, setUploadedSFList] = useState([]);
  const handleLikeClick = (route: string) => {
    navigate(route);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds`);
        const data = response.data;

        setUploadedSFList(data.uploadedSFList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageStyle>
      <ProfileLayout>
        
      <ScrollableContainer>
        <Style>
          <Box>
            <MyPageTab/>
            <PostComment/>
            <BottomRectangle />
          </Box>

          <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
            내가 업로드한 숏폼
          </div>
          <PostShort uploadedSFList={uploadedSFList} />
        </Style>
      </ScrollableContainer>
        
      </ProfileLayout>
    </PageStyle>
  );
};

export default MyPage_post_comment;
