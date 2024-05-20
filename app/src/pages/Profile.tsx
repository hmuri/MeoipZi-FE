import { useRef, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [height, setHeight] = useState("");
  const [heightSecret, setHeightSecret] = useState(false);
  const [weight, setWeight] = useState("");
  const [weightSecret, setWeightSecret] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // 기타 폼 데이터를 JSON 객체로 준비
    const profileData = {
      nickname,
      height,
      heightSecret,
      weight,
      weightSecret,
    };

    const formData = new FormData();
    // 폼 데이터를 JSON 문자열로 변환하여 Blob 형태로 'profileData' 필드에 추가
    formData.append(
      "profileData",
      new Blob([JSON.stringify(profileData)], { type: "application/json" })
    );

    // 이미지 파일 추가
    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    try {
      // formData를 서버로 전송
      const response = await axiosInstance.post(
        "/profiles/settings",
        formData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data'는 Axios에서 자동으로 설정됩니다.
            // 따라서 여기서 명시적으로 설정할 필요가 없습니다.
          },
        }
      );
      console.log(response.data); // 성공 응답 처리
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>프로필 설정</Title>
      <ChooseImg>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: "none" }}
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          이미지 선택
        </Button>
      </ChooseImg>
      <InfoBox>
        <LabelBox>
          <Label>닉네임</Label>
          <InfoInputBox>
            <InfoInput
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></InfoInput>
          </InfoInputBox>
        </LabelBox>
        <LabelBox>
          <Label>신장</Label>
          <InfoInputBox>
            <InfoInput
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            ></InfoInput>
            <input
              type="checkbox"
              checked={heightSecret}
              onChange={() => setHeightSecret(!heightSecret)}
            />{" "}
            비공개
          </InfoInputBox>
        </LabelBox>
        <LabelBox>
          <Label>몸무게</Label>
          <InfoInputBox>
            <InfoInput
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></InfoInput>
            <input
              type="checkbox"
              checked={weightSecret}
              onChange={() => setWeightSecret(!weightSecret)}
            />{" "}
            비공개
          </InfoInputBox>
        </LabelBox>
      </InfoBox>
      <Button type="submit">완료</Button>
    </Container>
  );
};

export default Profile;
const Container = styled.form`
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
