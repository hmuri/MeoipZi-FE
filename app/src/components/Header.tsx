import React, { ReactNode } from "react";
import styled from "styled-components";
import mainLogo from "../images/mainLogo.png";

const StyleHeader = styled.div`
    position: fixed;
    top:0;
    width: 375px; /*40%??*/
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

interface HeaderProps {
    children: ReactNode;
  }

function Header(props: HeaderProps): JSX.Element {
    return(
        <StyleHeader id = "header">
            <main>{props.children}</main>
        </StyleHeader>
    );
}

export default Header;