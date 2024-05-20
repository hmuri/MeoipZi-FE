import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
    title: string;
    onClick?: () => void;
    isActive: boolean;
    onClickHandler?: () => void;
    navigateTo?: string;
}

const StyledButton = styled.button<{ isActive: boolean }>`
    width: 58px;
    height: 25px;
    color: ${({ isActive }) => (isActive ? "#000000" : "#A9A9A9")};
    border-color: transparent;
    font-family: Noto Sans Arabic;
    font-size: 10px;
    padding: 0;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color: transparent;
    cursor: pointer;
    z-index: 100;
    margin-left: 15px; /* margin between buttons */
`;

const Button: React.FC<ButtonProps> = ({ title, onClick, isActive, onClickHandler, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isActive) { // Only trigger actions if the button is not already active
            if (onClickHandler) {
                onClickHandler();
            }
            if (navigateTo) {
                navigate(navigateTo);
            }
            if (onClick) {
                onClick();
            }
        }
    };

    return (
        <StyledButton isActive={isActive} onClick={handleClick}>
            {title || "button"}
        </StyledButton>
    );
};

export default Button;



