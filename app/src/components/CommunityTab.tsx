import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button_clicked";

const StyleTab = styled.div`
    position: fixed;
    width: 380px;
    height: 42px;
    flex-shrink: 0;
    background: white;
    z-index:50;
    left: 50%;
    transform: translateX(-50%);
    top: 86px;

    display: flex;
    flex-direction: column;
`;

const Styleul = styled.ul`
    position: fixed;
    display: flex;
    padding: 2px;
    justify-content: flex-end;
    margin: 10px 21px 0 0; /* 21px margin on the right, 0 margin on other sides */
`;

const StyledButton = styled.button`
    margin-left: 21px; /*margin between buttons*/
    width: 54px;
    height: 25px;
    color: black;

    font-family: Noto Sans Arabic;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color:transparent;
    cursor: pointer;

`;

const BottomRectangle = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ECECEC;
  margin-top: auto; /* Push the rectangle to the bottom */
`;


function CommunityTab(): JSX.Element {
    const navigate = useNavigate();

    const [activeButton, setActiveButton] = useState<string>("");

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return(
        <StyleTab id = "tab">
            <Styleul><Button
                title = "브랜드/업체"
                isActive={activeButton === "브랜드/업체"}
                onClickHandler={() => handleButtonClick("브랜드/업체")}
                onClick ={() =>{
                    navigate("/BrandCommunity");
                }}/>
                <Button
                title = "쇼핑&패션"
                isActive={activeButton === "쇼핑&패션"}
                onClickHandler={() => handleButtonClick("쇼핑&패션")}
                onClick ={() =>{
                    navigate("/ShopCommunity");
                }}/>
                <Button
                title = "자유게시판"
                isActive={activeButton === "자유게시판"}
                onClickHandler={() => handleButtonClick("자유게시판")}
                onClick ={() =>{
                    navigate("/FreeCommunity");
                }}/></Styleul>
            <BottomRectangle />
        </StyleTab>
    );
}

export default CommunityTab; 