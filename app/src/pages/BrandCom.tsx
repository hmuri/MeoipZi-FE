import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/list/PostList";
import Button from "../components/ui/Button";
import data_Brand from '../data/data_Brand.json';
import ComLayout from "../components/CommunityLayout";

interface MainPageProps {}

const BWrapper = styled.div`
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

const ButtonContainer = styled.div`
  position: fixed;
  margin-left: 250px;
  z-index: 100;
`;

const BrandCom: FC<MainPageProps> = () => {
  const navigate = useNavigate();

  console.log("Data in BrandCom:", data_Brand);

  return (
    <>
    <BWrapper>
      <Container>
        <PostList
          posts={data_Brand}
          onClickItem={(item) => {
            navigate(`/post/${item.id}`);
          }}
        />
        </Container>
    </BWrapper> 
    <Button
          title="write"
          onClick={() => {
            navigate("/post-write"); // Update the destination route
          }}
        />
    </>
    
    
  );
};

export default BrandCom;