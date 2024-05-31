import { ChangeEvent, FormEvent, useState } from "react";
import axiosInstance from "../api/axios";
import styled from "styled-components";
import LeftArrow from "../images/LeftArrow.png";
import { useNavigate } from "react-router-dom";

const PostShortForm = () => {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 비디오 미리보기 URL 상태 추가
  const [fileSelected, setFileSelected] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setFileSelected(true); // 파일이 선택되면 true로 설정
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileSelected(false); // 파일 선택이 취소되면 false로 설정
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("비디오 파일을 업로드 해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", contents);
    formData.append("imgUrl", file);

    try {
      const response = await axiosInstance.post("/shortforms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Server Response:", response.data);
      navigate("/shortform");
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Header>
          <img src={LeftArrow} />
          <span style={{ fontSize: "20px" }}>숏폼 업로드</span>
          <SubmitButton type="submit">등록</SubmitButton>
        </Header>
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
          required
        />
        <Textarea
          value={contents}
          onChange={handleContentsChange}
          placeholder="내용을 입력하세요"
          required
        />
        <div>
          <CustomFileInput htmlFor="videoUpload">비디오 업로드</CustomFileInput>
          <HiddenInput
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required={fileSelected}
          />
        </div>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "start" }}
        >
          {previewUrl && <Video controls src={previewUrl} />}
        </div>
      </form>
    </Container>
  );
};
export default PostShortForm;

const Container = styled.div`
  width: 333px;
  height: 812px;
  position: relative;
  display: flex;
  flex-direction: column;
  items-content: center;
  margin: 20px;
`;

const Input = styled.input`
  margin-top: 50px;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: solid 1px #ececec;
  width: 100%;
`;

const Textarea = styled.textarea`
  margin-top: 30px;
  padding: 10px;
  min-height: 300px;
  width: 100%;
`;

const SubmitButton = styled.button``;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

const Video = styled.video`
  width: 100px;
  height: 200px;
  margin-bottom: 20px;
`;

const CustomFileInput = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
