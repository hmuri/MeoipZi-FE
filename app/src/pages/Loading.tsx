import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 200px;
  max-height: 100%
  
  background: blue;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 500px;
  font-style: Noto Sans Arabic;
`;

const Loading: React.FC = () => {
  return (
    <Container>
      <Text>이동 중입니다...</Text>
    </Container>
  );
};

export default Loading;
