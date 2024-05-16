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
  width: 90%;
  max-width: 375px;
  bottom: 0;
  overflow-y: auto;
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

// Define the MyPage_post_feed functional component
const MyPage_post_feed: FC<{ component?: React.ReactNode }> = ({ component }) => {
  const navigate = useNavigate();
  const [uploadedCommList, setUploadedCommList] = useState([]); // State for uploaded community list
  const [uploadedSFList, setUploadedSFList] = useState([]); // State for uploaded short form list

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/posts/feeds`);
        const data = response.data;

        setUploadedCommList(data.uploadedCommList);
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
              <MyPageTab />
              {/* Pass uploadedCommList to PostFeed */}
              <PostFeed uploadedCommList={uploadedCommList} />
              <BottomRectangle />
            </Box>
            <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
              내가 업로드한 숏폼
            </div>
            {/* Pass uploadedSFList to PostShort */}
            <PostShort uploadedSFList={uploadedSFList} />
          </Style>
        </ScrollableContainer>
      </ProfileLayout>
    </PageStyle>
  );
};

export default MyPage_post_feed;

