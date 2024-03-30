import { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isModalOpen } from "../recoil/recoil";
import LoginModal from "../components/Login/LoginModal";
import MainLogo from "../assets/common/main_logo.png";

const Login = () => {
  const [isOpen, setIsOpen] = useRecoilState(isModalOpen);

  // 단축키
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && event.ctrlKey) {
      setIsOpen(true);
    }
  };

  // event handler 등록
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <LogoImgBox src={MainLogo} />
      <GoogleSignUpBox onClick={() => setIsOpen(true)}>
        <SignUpText>로그인 / 회원가입</SignUpText>
      </GoogleSignUpBox>
      <LoginModal />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;

  height: 100%;
  color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 34px;
  position: relative;
`;

const GoogleSignUpBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 114px;
  height: 46px;

  border-radius: 29.5px;
  border: 1px solid #a9a9a9;

  cursor: pointer;

  color: #464646;
`;

const LogoImgBox = styled.img`
  width: 173px;
  height: 84px;
  margin-bottom: 40%;
`;

const SignUpText = styled.div`
  width: 100%;
  text-align: center;
  font-family: "Noto Sans Arabic";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
