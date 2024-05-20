import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import shorts from "../images/gotoShorts.png";
import shortsClicked from "../images/gotoShorts_c.png";
import search from "../images/search.png";
import searchClicked from "../images/search_c.png";
import main from "../images/homeB.png";
import mainClicked from "../images/homeB_c.png";
import community from "../images/communityB.png";
import communityClicked from "../images/communityB_c.png";
import profile from "../images/profileB.png";
import profileClicked from "../images/profileB_c.png";

const StyleFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 56px;
  flex-shrink: 0;
  z-index: 100;
  background: #ececec;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ButtonS = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 3px;
  cursor: pointer;
`;

function Footer(): JSX.Element {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Update active button based on current route
    switch (location.pathname) {
      case "/Shorts":
        setActiveButton(1);
        break;
      case "/Search":
        setActiveButton(2);
        break;
      case "/MainPage":
        setActiveButton(3);
        break;
      case "/BrandCommunity":
        setActiveButton(4);
        break;
      case "/mypage/likes":
        setActiveButton(5);
        break;
      default:
        setActiveButton(null);
    }
  }, [location.pathname]);

  return (
    <StyleFooter id="footer">
      <Link to="/Shorts">
        <ButtonS
          src={activeButton === 1 ? shortsClicked : shorts}
          alt="go to Shorts Page"
        />
      </Link>
      <Link to="/Search">
        <ButtonS
          src={activeButton === 2 ? searchClicked : search}
          alt="go to Search"
        />
      </Link>
      <Link to="/MainPage">
        <ButtonS
          src={activeButton === 3 ? mainClicked : main}
          alt="go to Main Page"
        />
      </Link>
      <Link to="/BrandCommunity">
        <ButtonS
          src={activeButton === 4 ? communityClicked : community}
          alt="go to Community"
        />
      </Link>
      <Link to="/mypage/likes">
        <ButtonS
          src={activeButton === 5 ? profileClicked : profile}
          alt="go to Profile"
        />
      </Link>
    </StyleFooter>
  );
}

export default Footer;
