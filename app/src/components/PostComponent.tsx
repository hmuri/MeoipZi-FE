import React from "react";
import styled from "styled-components";

interface PostCompProps{
    Id: string
    title: string
    date: number
    heartCnt: number
    commentCnt: number
    onClick?: () => void;
}

const StyledWrapper = styled.div`

`;

function Postcomponent({Id, title, date, heartCnt, commentCnt, onClick }: PostCompProps) {
    
}

export default Postcomponent;