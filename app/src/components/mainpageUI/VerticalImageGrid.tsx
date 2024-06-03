import React from "react";
import styled from "styled-components";
import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getGenreItems } from "../../api/category";
import { getItem } from "../../api/product";

/* Array of example images
const images = [TestImg1, TestImg2, TestImg3, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, DefaultImg, 
  DefaultImg, DefaultImg, DefaultImg, DefaultImg];
*/
// Styled components for the image grid and individual images
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3 columns with 100px width */
  gap: 15px; /* Gap between grid items */
  margin: 8px; /* Margin on top and bottom */
`;

const Image = styled.img`
  width: 100%; /* Image width */
  height: 100%; /* Image height */
`;

interface VerticalImageGridProps {
  images: any; // Array of image URLs
}

// Component definition
const VerticalImageGrid: React.FC<VerticalImageGridProps> = ({ images }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log("images" + JSON.stringify(images));

  const handleGenreClick = (id: number) => {
    queryClient
      .fetchQuery(["productItem", id], () => getItem(id))
      .then((data) => {
        console.log("data" + data);
        navigate(`/outfit/${id}`, { state: { items: data } });
      })
      .catch((error) => {
        console.error("Failed to fetch category items:", error);
      });
  };
  return (
    <ImageGrid>
      {images.map((image: { outfitId: number; imgUrl: string }) => (
        <Image
          key={image.outfitId}
          src={image.imgUrl}
          alt={`Image ${image.outfitId}`}
          onClick={() => handleGenreClick(image.outfitId)}
        />
      ))}
    </ImageGrid>
  );
};

export default VerticalImageGrid;
