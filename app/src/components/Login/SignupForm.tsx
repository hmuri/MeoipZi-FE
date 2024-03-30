import { useState } from "react";
import styled from "styled-components";
import { useSignup } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLogin } from "../../recoil/recoil";

export default function SignupForm(){
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [activeForm, setActiveForm] = useRecoilState(isLogin);

  const navigate = useNavigate();

  const { mutate: signupMutate } = useSignup();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    // 회원가입 처리 로직
    signupMutate(
      { username: nickname, loginId: id, password },
      {
        onSuccess: () => {
          alert("Your account is set up.");
          setActiveForm("login"); 
        },
      }
    );
  };

  return (
    <Container onSubmit={handleSubmit}>
      <InputBox>
        <Label htmlFor="id">ID*</Label>
        <InputText type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
      </InputBox>
      <InputBox>
        <Label htmlFor="nickname">Nickname*</Label>
        <InputText type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </InputBox>
      <InputBox>
        <Label htmlFor="password">Password*</Label>
        <InputText type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </InputBox>
      <InputBox>
        <Label htmlFor="passwordConfirm">Confirm Password*</Label>
        <InputText type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      </InputBox>
      <SubmitBtn type="submit">SIGN UP</SubmitBtn>
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
`

const InputBox = styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    gap: 5px;
`

const Label = styled.label`
    text-align: left;
    font-family: SUIT;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const InputText = styled.input`
    border: 1px solid #d9d9d9;
    height: 27px;
    font-size: 15px;
`

const SubmitBtn = styled.button`
    width: 70%;
    border: none;
    border-radius: 0;
    background-color: black;
    color: #fff;
    padding: 13px 0;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
`
