import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLogin } from "../../recoil/recoil";
import { useLogin } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [activeForm, setActiveForm] = useRecoilState(isLogin);
  const { mutate: loginMutate, isError } = useLogin();

  const navigate = useNavigate();

  const handleSignUp = () => {
    setActiveForm("signup");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginMutate({ username: id, password });
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="id">ID</Label>
        <InputText
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </InputBox>
      <InputBox>
        <Label htmlFor="password">Password</Label>
        <InputText
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputBox>
      <SubmitBtn type="submit">LOG IN</SubmitBtn>
      <div style={{ display: "flex", gap: "10px" }}>
        <SubText>Don't have an account?</SubText>
        <SubText
          style={{ borderBottom: "1px solid", gap: "10px", cursor: "pointer" }}
          onClick={handleSignUp}
        >
          {" "}
          Join Us!{" "}
        </SubText>
      </div>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const InputBox = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  text-align: left;
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const InputText = styled.input`
  border: 1px solid #d9d9d9;
  height: 27px;
  font-size: 15px;
`;

const SubmitBtn = styled.button`
  width: 70%;
  border: none;
  border-radius: 0;
  background-color: black;
  color: #fff;
  padding: 13px 0;
  font-size: 16px;
  margin-top: 50px;
  cursor: pointer;
`;

const SubText = styled.div`
  display: flex;
  padding: 0 3px;
  text-align: center;
  justify-content: center;
`;
