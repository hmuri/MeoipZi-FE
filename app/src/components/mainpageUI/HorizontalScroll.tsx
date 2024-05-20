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

import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axiosInstance from "../../api/axios";
import {
  ScrollMenu,
  VisibilityContext,
} from "react-horizontal-scrolling-menu";
import { useNavigate } from "react-router-dom";
import "react-horizontal-scrolling-menu/dist/styles.css";

const ScrollContainer = styled.div`
  width: 400px; /* Set the desired height */
  overflow-x: auto; /* or scroll */
`;

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
  margin-top: 8px;
`;

function Card({ onClick, selected, itemId, imageUrl }: CardProps) {
  const visibility = useContext(VisibilityContext);

  return (
    
    <div
      onClick={() => onClick(itemId)}
      style={{
        width: "70px",
      }}
      tabIndex={0}
    >
      <div className="card">
        <CardImage src={imageUrl} alt={`Banner ${itemId}`} />
        
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
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const isItemSelected = (id: string): boolean => selected.includes(id);

  const handleClick = (id: string) => () => {
    setSelected((currentSelected) =>
      isItemSelected(id)
        ? currentSelected.filter((el) => el !== id)
        : [...currentSelected, id]
    );
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/meoipzi/partners`);
        const itemsFromEndpoint: Item[] = response.data.map((item: any) => ({
          id: item.partnersId.toString(),
          imageUrl: item.imageUrl,
        }));
        setItems(itemsFromEndpoint);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    
    <ScrollContainer>
    <ScrollMenu>
      {items.map(({ id, imageUrl }) => (
        <Card
          itemId={id}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
          imageUrl={imageUrl} // Pass imageUrl to the Card component
        />
      ))}
    </ScrollMenu>
    </ScrollContainer>
  );
}

export default HorizontalScroll;
