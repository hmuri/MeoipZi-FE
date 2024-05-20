import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button_clicked";

const StyleTab = styled.div`
    position: relative;
    width: 100%; /* Set width to 100% to ensure it takes the full width of its parent */
    max-width: 380px; /* Set a maximum width */
    height: auto; /* Let the height adjust based on the content */
    background: white;
    margin: 0 auto; /* Center the component horizontally */
    padding: 10px; /* Add some padding for spacing */
`;

const Styleul = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style: none; /* Remove default list styles */
    padding: 0; /* Remove default padding */
`;

const StyledButton = styled.button`
    width: 54px;
    height: 25px;
    color: black;
    font-family: Noto Sans Arabic;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background-color: transparent;
    cursor: pointer;
`;

const BottomRectangle = styled.div`
width: 375px;
height: 1px;
background-color: #ECECEC;
margin-top: 15px; /* Push the rectangle to the bottom */
`;

const MyPageTab = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [activeButton, setActiveButton] = useState<string>("");

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return (
        <StyleTab id="tab">
            <Styleul>
                <Button
                    title="피드"
                    isActive={activeButton === "피드"}
                    onClickHandler={() => handleButtonClick("피드")}
                    onClick={() => {
                        navigate("/mypage/posts/feeds");
                    }}
                />
                <Button
                    title="스크랩"
                    isActive={activeButton === "스크랩"}
                    onClickHandler={() => handleButtonClick("스크랩")}
                    onClick={() => {
                        navigate("/mypage/posts/scraps");
                    }}
                />
                <Button
                    title="댓글"
                    isActive={activeButton === "댓글"}
                    onClickHandler={() => handleButtonClick("댓글")}
                    onClick={() => {
                        navigate("/mypage/posts/comments");
                    }}
                />
            </Styleul>
            <BottomRectangle />
        </StyleTab>
    );
};

export default MyPageTab;

