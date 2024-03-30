import styled from "styled-components";

const Profile = () => {
  return (
    <Container>
      <Title>프로필 설정</Title>
      <ChooseImg></ChooseImg>
      <InfoBox>
        <LabelBox>
          <Label>닉네임</Label>
          <InfoInputBox>
            <InfoInput></InfoInput>
          </InfoInputBox>
        </LabelBox>
        <LabelBox>
          <Label>신장</Label>
          <InfoInputBox>
            <InfoInput></InfoInput>
          </InfoInputBox>
        </LabelBox>
        <LabelBox>
          <Label>몸무게</Label>
          <InfoInputBox>
            <InfoInput></InfoInput>
          </InfoInputBox>
        </LabelBox>
      </InfoBox>
      <Button>완료</Button>
    </Container>
  );
};
export default Profile;

const Container = styled.div`
  width: 100%;
  height: 812px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  position: absolute;
  top: 45px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: #464646;

  text-align: center;
  font-family: "Noto Sans Arabic";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 15px */
  letter-spacing: -0.15px;
`;

const ChooseImg = styled.div`
  width: 93px;
  height: 93px;
  background-color: gray;
  border-radius: 100%;
  position: absolute;

  top: 119px;
`;

const InfoBox = styled.div`
  width: 300px;
  position: absolute;
  bottom: 251px;
  display: flex;
  flex-direction: column;

  gap: 40px;
`;

const LabelBox = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: space-between;
`;

const Label = styled.div`
  display: flex;
  width: 61px;
  color: #464646;
  align-items: center;
  font-family: "Noto Sans Arabic";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const InfoInputBox = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
`;

const InfoInput = styled.input`
  height: 30px;
  width: 100%;
  border-bottom: solid 1px #a4a4a4;
`;

const Button = styled.button`
  width: 94px;
  height: 32px;
  border-radius: 3px;
  background: #d9d9d9;
  position: absolute;
  bottom: 150px;

  color: #464646;

  font-family: "Noto Sans Arabic";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 14px */
`;
