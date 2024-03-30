import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);

  return (
    <Container>
      <InsideContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </InsideContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 800px;
  justify-content: center;
  margin: auto;
`;

const InsideContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
`;

export default App;
