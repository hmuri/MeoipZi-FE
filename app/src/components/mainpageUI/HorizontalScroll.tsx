/*import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  ScrollMenu,
  VisibilityContext,
} from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import items from "../../data/partner_Brand.json";

const ScrollContainer = styled.div`
  width: 57vh; 
  overflow-x: auto; 

interface Item {
  id: string;
  imageUrl: string; // Add imageUrl to the Item interface
}

interface CardProps {
  onClick: (id: string) => void;
  selected: boolean;
  itemId: string;
  imageUrl: string; // Add imageUrl to the CardProps interface
}

const CardImage = styled.img`
  width: 54px;
  height: 54px;
`;

function Card({ onClick, selected, itemId, imageUrl }: CardProps) {
  const visibility = useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(itemId)}
      style={{
        width: "160px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <CardImage src={imageUrl} alt={`Banner ${itemId}`} />
        <div>
          visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}
        </div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: "20px",
        }}
      />
    </div>
  );
}

function HorizontalScroll() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    // You can use useEffect for additional operations if needed
  }, []); // Empty dependency array means it runs only once when component mounts

  const isItemSelected = (id: string): boolean => selected.includes(id);

  const handleClick = (id: string) => () => {
    setSelected((currentSelected) =>
      isItemSelected(id)
        ? currentSelected.filter((el) => el !== id)
        : [...currentSelected, id]
    );
  };

  return (
    <ScrollContainer>
      <ScrollMenu>
        {items.map(({ id, imageUrl }: Item) => (
          <Card
            itemId={id}
            key={id}
            onClick={handleClick(id)}
            selected={isItemSelected(id)}
            imageUrl={imageUrl}
          />
        ))}
      </ScrollMenu>
    </ScrollContainer>
  );
}

export default HorizontalScroll;
*/

import React from "react";
import styled from "styled-components";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { useNavigate } from "react-router-dom";
import "react-horizontal-scrolling-menu/dist/styles.css";

const ScrollContainer = styled.div`
  width: 800px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
`;

interface CardProps {
  data: { imgUrl: string; shopUrl: string };
  onClick: (shopUrl: string) => void;
}

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 10px;

  cursor: pointer;
  border-radius: 10px;
`;

const CardWrapper = styled.div`
  display: inline-block;
  margin-right: 20px; /* 사진 사이의 간격을 조정합니다. */
`;

function Card({ data, onClick }: CardProps) {
  const handleClick = () => {
    onClick(data.shopUrl);
  };

  return (
    <CardWrapper>
      <div className="card" onClick={handleClick}>
        <CardImage src={data.imgUrl} alt={`Banner`} />
      </div>
      <div style={{ height: "20px" }} />
    </CardWrapper>
  );
}

interface HorizontalScrollProps {
  dataList: { imgUrl: string; shopUrl: string }[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ dataList }) => {
  const navigate = useNavigate();

  const handleImageClick = (shopUrl: string) => {
    window.location.href = shopUrl;
  };

  return (
    <ScrollContainer>
      <ScrollMenu>
        {dataList.map((data, index) => (
          <Card key={index} data={data} onClick={handleImageClick} />
        ))}
      </ScrollMenu>
    </ScrollContainer>
  );
};

export default HorizontalScroll;
