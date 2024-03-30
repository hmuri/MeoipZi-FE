import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center; // Fixed typo in 'align-items'
  justify-content: center;
  margin-top: 126px;
  margin-bottom: 56px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function WritePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <Wrapper>
      <Container>
        <TextInput
          height={20}
          value={title}
          onChange={handleTitleChange}
        />

        <TextInput
          height={480}
          value={content}
          onChange={handleContentChange}
        />

        <Button
          title="글 작성하기"
          onClick={() => {
            navigate("/BrandCommunity");
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default WritePost;