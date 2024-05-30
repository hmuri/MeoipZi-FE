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
  imgUrl: string[];
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  category: string;
  likedByUser: boolean;
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

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
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
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | string>(Category.Brand);
  const [deletedImages, setDeletedImages] = useState<number[]>([]);

  const isEditing = location.state && location.state.postDetails;

  useEffect(() => {
    if (isEditing) {
      const { postDetails } = location.state as { postDetails: PostDetails };
      setTitle(postDetails.title);
      setContent(postDetails.contents);
      setCategory(postDetails.category);
      if (postDetails.imgUrl) {
        setImagePreviews(postDetails.imgUrl);
      }
    }
  }, [isEditing, location.state]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const newImages = Array.from(selectedImages);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const newImagePreviews = newImages.map((image) => URL.createObjectURL(image));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as Category);
  };

  const handleDeleteImage = (index: number) => {
    // Add the index of the deleted image to deletedImages state
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, index]);

    // Remove the image preview from imagePreviews
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("contents", content);
      formData.append("category", category);
      if(images){
        images.forEach((image) => {
        formData.append("imgUrl", image); // Append each image with the key "imgUrl[]"
        });
      }
      

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
  
      // Append non-deleted images to the formData
      images.forEach((image, index) => {
        if (!deletedImages.includes(index)) {
          formData.append("imgUrl", image);
        }
      });
  
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
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <ImagePreviewContainer>
          {imagePreviews.map((preview, index) => (
            <div key={index} style={{ position: "relative" }}>
              <ImagePreview src={preview} alt={`Image Preview ${index}`} />
              <DeleteButton onClick={() => handleDeleteImage(index)}>Delete</DeleteButton>
            </div>
          ))}
        </ImagePreviewContainer>
        {!isEditing && <Button title="글 작성하기" onClick={handlePostSubmit} />}
        {isEditing && <Button title="수정하기" onClick={handlePostUpdate} />}
      </Container>
    </Wrapper>
  );
};

export default WritePost;
