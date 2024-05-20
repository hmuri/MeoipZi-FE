import React, { FC, useState } from "react";
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
import ProfileLayout from "../components/MyPageUI/ProfileLayout";

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

const Style = styled.div`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyPage_post_scrap: FC<{ component?: React.ReactNode }> = ({ component }) => {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState<string>("");
  
  const handleLikeClick = (route: string) => {
    navigate(route);
  };

  return (
    <PageStyle>
      <ProfileLayout>
        <ButtonLocation>
          <PButton
            src={likeNoClicked}
            alt="like not clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/likes")}
            route="/mypage/likes" // Specify the route prop here
          />
          <PButton
            src={postClicked}
            alt="post clicked"
            width={160}
            onClick={() => handleLikeClick("/mypage/posts/feeds")}
            route="/mypage/posts/feeds" // Specify the route prop here
          />
        </ButtonLocation>

        <Style>
          <Box>
          <MyPageTab/>
          <PostScrap/>
            <BottomRectangle />
          </Box>

          <div style={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>
            내가 업로드한 숏폼
          </div>
          <PostShort />
        </Style>
      </ProfileLayout>
    </PageStyle>
  );
};

export default MyPage_post_scrap;
