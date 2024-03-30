import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import Button from "../components/ui/Button_clicked";
import data_S from '../data/data_Shop.json';
import CommunityTab from "../components/CommunityTab";

interface MainPageProps {}

const SWrapper = styled.div`
  padding: 16px;
  width: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;  // Fixed typo in 'align-items'
  justify-content: center;
  
  margin-bottom: 3vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 355px;
  height: 100%;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
  flex: 1;
`;

const ShopCom: FC<MainPageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
    <SWrapper>
      <Container>
        <PostList
          posts={data_S}
          onClickItem={(item) => {
            navigate(`/post/${item.id}`);
          }}
        />
      </Container>
    </SWrapper>
    </>
    
  );
};

export default ShopCom;