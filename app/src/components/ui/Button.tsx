import React from "react";
import styled from "styled-components";

interface ButtonProps {
    title: string;
    onClick?: () => void;
}

const StyledButton = styled.button`
    width: 58px;
    height: 25px;
    color: #A9A9A9;
    border-color: transparent;
    font-family: Noto Sans Arabic;
    font-size: 10px;
    padding: 0;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color:transparent;
    cursor: pointer;
    z-index: 100;

    margin-left: 15px; /*margin between buttons*/
`;

function Button({ title, onClick }: ButtonProps): JSX.Element {
    return <StyledButton onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;