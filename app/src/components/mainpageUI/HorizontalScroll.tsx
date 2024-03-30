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

import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  ScrollMenu,
  VisibilityContext,
} from "react-horizontal-scrolling-menu";
import { useNavigate } from "react-router-dom";
import "react-horizontal-scrolling-menu/dist/styles.css";
import TestImg1 from "../../images/test.png";
import TestImg2 from "../../images/test2.png";
import TestImg3 from "../../images/test3.png";
import DefaultImg from "../../images/image-file.png";
import Partners from "../../images/PartnersList.png";

interface Item {
  id: string;
  imageUrl: string; // Add imageUrl to the Item interface
}

const getItems = (): Item[] => {
  const items: Item[] = [];
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      items.push({ id: `element-${i}`, imageUrl: Partners });
    } else if (i === 1) {
      items.push({ id: `element-${i}`, imageUrl: TestImg1 });
    } else if (i === 2) {
      items.push({ id: `element-${i}`, imageUrl: TestImg2 });
    } else if (i === 3) {
      items.push({ id: `element-${i}`, imageUrl: TestImg3 });
    }else {
      items.push({ id: `element-${i}`, imageUrl: DefaultImg });
    }
  }
  return items;
};

const ScrollContainer = styled.div`
  width: 57vh; /* Set the desired height */
  overflow-x: auto; /* or scroll */
`;

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
  const [items, setItems] = useState<Item[]>(getItems);
  const [selected, setSelected] = useState<string[]>([]);

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