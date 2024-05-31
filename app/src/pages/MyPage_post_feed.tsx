// Import necessary modules and components
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosInstance from "../api/axios"; // Import axiosInstance

import PostShort from "../components/MyPageUI/PostShort";
import PButton from "../components/MyPageUI/PButton";
import likeNoClicked from "../images/likeNoClicked.png";
import postClicked from "../images/postClicked.png";

import MyPageTab from "../components/MyPageUI/MyPageTab";
import PostFeed from "../components/MyPageUI/PostFeed";
import PostScrap from "../components/MyPageUI/PostScrap";
import PostComment from "../components/MyPageUI/PostComment";
import ProfileLayout from "../components/MyPageUI/ProfileLayoutp";

// Define styled components and their styles
const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BottomRectangle = styled.div`
  width: 375px;
  height: 2px;
  background-color: #ececec;
  margin-top: auto;
`;

const ButtonLocation = styled.div`
  background: #ececec;
  height: 40px;
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  border-radius: 5px;
`;

const ScrollableContainer = styled.div`
  position: fixed;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  bottom: 0;
  overflow-y: auto;
`;

const Style = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 130px;
  margin-left: 20px;
  overflow-y: auto;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigateButton = styled.button`
  width: 40px;
  height: 25px;
  background-color: transparent;
  color: #8B8B8B;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px; /* Adjust font size as needed */
  font-weight: bold;
  padding: 0;
  margin-bottom: 15px;
  margin-top: -4vh;
`;

const PushRight = styled.div`
  margin-left: 5vh;
`;

// Define the MyPage_post_feed functional component
const MyPage_post_feed: FC<{ component?: React.ReactNode }> = ({ component }) => {
  const navigate = useNavigate();
  const [uploadedComms, setUploadedComms] = useState([]);
  const [uploadedSFs, setUploadedSFs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds`);
        const data = response.data;
        setUploadedComms(data.uploadedComms);
        setUploadedSFs(data.uploadedSFs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <PageStyle>
      <ProfileLayout>
        <ScrollableContainer>
          <Style>
            <Box>
              <MyPageTab />
              {/* Pass uploadedComms and uploadedSFs as props to PostFeed */}
              <PushRight>
                <PostFeed uploadedCommList={uploadedComms} uploadedSFList={uploadedSFs} />
              </PushRight>
              
              <NavigateButton onClick={() => handleNavigate('/post-feed')}>. . .</NavigateButton>
              <BottomRectangle />
            </Box>
            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              내가 업로드한 숏폼
            </div>
            <PostShort />
            {/*<NavigateButton onClick={() => handleNavigate('/post-shorts')}>. . .</NavigateButton>*/}
          </Style>
        </ScrollableContainer>
      </ProfileLayout>
    </PageStyle>
  );
};

export default MyPage_post_feed;
