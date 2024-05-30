import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

interface VintageCompProps {
  imageUrls: string[];
}

const VintageContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;

const VintageImage = styled.img`
  width: 300px;
  height: 250px;
  margin-right: 10px;
  cursor: pointer;
`;

const VintageComp: React.FC<VintageCompProps> = ({ imageUrls }) => {
  const navigate = useNavigate();
  const [vintageIds, setVintageIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchVintageIds = async () => {
      try {
        const response = await axiosInstance.get("/meoipzi");
        const data = response.data;
        if (data.vintageNewsList) {
          const ids = data.vintageNewsList.map((item: { vintageId: number }) => item.vintageId);
          setVintageIds(ids);
        }
      } catch (error) {
        console.error("Error fetching vintage IDs:", error);
      }
    };

    fetchVintageIds();
  }, []);
{/*
  const handleClick = (id: number) => {
    navigate(`/VintageNews/${id}`);
  };
*/}
  return (
    <VintageContainer>
      {imageUrls.map((imageUrl: string, index: number) => (
        <VintageImage
          key={index}
          src={imageUrl}
          alt={`Vintage News ${index + 1}`}
          //onClick={() => handleClick(vintageIds[index])}
        />
      ))}
    </VintageContainer>
  );
};

export default VintageComp;
