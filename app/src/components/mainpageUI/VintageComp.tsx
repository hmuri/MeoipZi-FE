import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface VintageCompProps {
    imageUrls: string[];
  }

const VintageContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;

const VintageImage = styled.img`
  width: 200px;
  height: 100px;
  margin-right: 10px;
  cursor: pointer;
`;

const VintageComp: React.FC<VintageCompProps> = ({ imageUrls }) => {
    const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/VintageNews/${id}`);
  };

  return (
    <VintageContainer>
       {imageUrls.map((imageUrl: string, index: number) => (
        <VintageImage
          key={index}
          src={imageUrl}
          alt={`Vintage News ${index + 1}`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </VintageContainer>
  );
};

export default VintageComp;
