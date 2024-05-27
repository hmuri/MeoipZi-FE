import React, { useState, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import axiosInstance from "../api/axios";

enum Category {
  Brand = "brand",
  Shop = "shop",
  Play = "play",
}

interface WritePostProps {
  currentPath: string;
}

interface PostDetails {
  communityId: number;
  userName: string;
  profileImg: string;
  createdAt: string;
  title: string;
  contents: string;
  imgUrl: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  category: string;
  likedByUser: boolean; // This field indicates if the current user has liked the post
}

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const Dropdown = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  cursor: pointer;
`;

const WritePost: React.FC<WritePostProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>(Category.Brand);

  useEffect(() => {
    if (location.state) {
      const { postDetails } = location.state as { postDetails: PostDetails };
      setTitle(postDetails.title);
      setContent(postDetails.contents);
      setCategory(postDetails.category as Category);
      // You might need to handle image prefilling if required
    }
  }, [location.state]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString());
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as Category);
  };

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contents", content);
      formData.append("category", category);
      if (image) {
        formData.append("imgUrl", image); // Ensure the key here matches what your backend expects
      }

      // Alternative method to log formData entries
      formData.forEach((value, key) => {
        console.log(key + ': ' + value);
      });

      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/communities`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post submitted successfully", response.data);

      const { communityId } = response.data;
      navigate(`/post/${communityId}`);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handlePostUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contents", content);
      formData.append("category", category);
      if (image) {
        formData.append("imgUrl", image); // Ensure the key here matches what your backend expects
      }

      const { postDetails } = location.state!;
      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_BASE_URL}/communities/${postDetails.communityId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post updated successfully", response.data);
      navigate(`/post/${postDetails.communityId}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <div>카테고리</div>
        <Dropdown value={category} onChange={handleCategoryChange}>
          <option value={Category.Brand}>Brand</option>
          <option value={Category.Shop}>Shop</option>
          <option value={Category.Play}>Play</option>
        </Dropdown>
        <h4>제목</h4>
        <TextInput height={20} value={title} onChange={handleTitleChange} />
        <div>글</div>
        <TextInput height={480} value={content} onChange={handleContentChange} multiline />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
        <Button title="글 작성하기" onClick={handlePostSubmit} />
        <Button title="수정하기" onClick={handlePostUpdate} />
      </Container>
    </Wrapper>
  );
};

export default WritePost;
