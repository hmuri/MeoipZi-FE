import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../images/mainLogo.png";
import alarmLogo from "../../images/alarm.png";

const StyleHeader = styled.div`
    position: fixed;
    top:0;
    width: 400px;
    height: 86px;
    flex-shrink: 0;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    align-items:center;
    justify-content:center;

    background-color: white;
`;


const LogoImage = styled.img`
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
`;

const AlarmImage = styled.img`
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    z-index:100;
`

function Header(): JSX.Element {
    const navigate = useNavigate();
    return(
        <StyleHeader id = "header">
            <LogoImage src={mainLogo} alt="MeoipZi" 
                onClick = {() => {
                    navigate("/MainPage");
                }}
            />
            <AlarmImage src={alarmLogo} alt="bell-image" 
                onClick = {() => {
                    navigate("/UserPage");
                }}
            />
        </StyleHeader>
    );
}

export default Header;