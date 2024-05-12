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
import axiosInstance from "../../api/axios";

const ScrollContainer = styled.div`
  width: 400px; /* Set the desired width */
  overflow-x: auto; /* or scroll */
`;

interface CardProps {
  imageUrl: string;
  onClick: () => void;
}

const CardImage = styled.img`
  width: 54px;
  height: 54px;
  margin-top: 8px;
`;

function Card({ imageUrl, onClick  }: CardProps) {
  const handleClick = () => {
    // Call the onClick handler when the card is clicked
    onClick();
  };

  return (
    <div style={{ width: "70px" }}>
      <div className="card" onClick={handleClick}> {/* Attach onClick handler to the card */}
        <CardImage src={imageUrl} alt={`Banner`} />
      </div>
      <div style={{ height: "20px" }} />
    </div>
  );
}

interface HorizontalScrollProps {
  imageUrls: string[]; // Array of image URLs
}

function HorizontalScroll({ imageUrls }: HorizontalScrollProps) {
  const handleImageClick = async (imageUrl: string) => {
    try {
      // Fetch data using GET request with the imageUrl
      const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/meoipzi/news/${imageUrl}`);
      // Process the response data as needed
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <ScrollContainer>
      <ScrollMenu>
        {imageUrls.map((imageUrl, index) => (
          <Card key={index} imageUrl={imageUrl} onClick={function (): void {
            throw new Error("Function not implemented.");
          } } />
        ))}
      </ScrollMenu>
    </ScrollContainer>
  );
}

export default HorizontalScroll;
