import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../api/axios";
import imageFile from "../images/image-file.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [height, setHeight] = useState("");
  const [heightSecret, setHeightSecret] = useState(false);
  const [weight, setWeight] = useState("");
  const [weightSecret, setWeightSecret] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // 이미지 미리보기 URL 상태 추가
  const [isDataFetched, setIsDataFetched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing data from /profiles/info when the component mounts
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/profiles/info");
        const data = response.data;
        setNickname(data.nickname);
        setHeight(data.height);
        setHeightSecret(data.heightSecret);
        setWeight(data.weight);
        setWeightSecret(data.weightSecret);
        setImagePreview(data.imgUrl); // Assuming the response contains an image URL
        setIsDataFetched(true);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); // 이미지 미리보기 URL 설정
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("height", height);
    formData.append("heightSecret", heightSecret.toString());
    formData.append("weight", weight);
    formData.append("weightSecret", weightSecret.toString());

    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("imgUrl", fileInputRef.current.files[0]);
    }

    try {
      const response = await axiosInstance.post("/profiles/settings", formData);
      console.log("Success:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("height", height);
    formData.append("heightSecret", heightSecret.toString());
    formData.append("weight", weight);
    formData.append("weightSecret", weightSecret.toString());

    if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
      formData.append("imgUrl", fileInputRef.current.files[0]);
    }

    try {
      const response = await axiosInstance.patch(
        "/profiles/settings",
        formData
      );
      console.log("Success:", response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error updating the form:", error);
    }
  };

  return (
    <Container>
      <Title>프로필 설정</Title>
      <ProfileImage src={imagePreview || imageFile} alt="Profile" />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <ChooseButton onClick={() => fileInputRef.current?.click()}>
        이미지 선택
      </ChooseButton>
      <InfoBox>
        <LabelBox>
          <Label>닉네임</Label>
          <InfoInputBox>
            <InfoInput
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </InfoInputBox>
        </LabelBox>
        <LabelBox style={{ alignItems: "start" }}>
          <Label>신장(cm)</Label>
          <InfoInputBox>
            <InfoInput
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <SubBox>
              <input
                type="checkbox"
                checked={heightSecret}
                onChange={() => setHeightSecret(!heightSecret)}
              />{" "}
              <SubText>비공개</SubText>
            </SubBox>
          </InfoInputBox>
        </LabelBox>
        <LabelBox style={{ alignItems: "start" }}>
          <Label>몸무게(kg)</Label>
          <InfoInputBox>
            <InfoInput
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <SubBox>
              <input
                type="checkbox"
                checked={weightSecret}
                onChange={() => setWeightSecret(!weightSecret)}
              />{" "}
              <SubText>비공개</SubText>
            </SubBox>
          </InfoInputBox>
        </LabelBox>
      </InfoBox>
      {!isDataFetched ? (
        <Button type="submit" onClick={handleSubmit}>
          완료
        </Button>
      ) : (
        <Button type="button" onClick={handleUpdate}>
          수정하기
        </Button>
      )}
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
  text-align: center;
  font-family: "Noto Sans Arabic";
  font-size: 15px;
  font-weight: 700;
  color: #464646;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
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
  display: flex;
  align-items: center;
  gap: 20px;
  height: 60px;
`;

const Label = styled.div`
  width: 61px;
  align-items: center;
  font-family: "Noto Sans Arabic";
  font-size: 14px;
  font-weight: 700;
  color: #464646;
`;

const InfoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: full;
  gap: 10px;
`;

const InfoInput = styled.input`
  width: 100%;
  height: 30px;
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
  font-weight: 700;
  cursor: pointer;
`;

const SubText = styled.div`
  font-size: 10px;
`;

const SubBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 8px;
`;

const ChooseButton = styled.div`
  position: absolute;
  top: 230px;
  display: inline-block;
  padding: 5px 10px;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 12px;

  &:hover {
    background-color: #0056b3;
  }
`;
