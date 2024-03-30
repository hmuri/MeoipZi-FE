import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Container>
          <InsideContainer>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            </Router>
          </InsideContainer>
        </Container>
      </QueryClientProvider>
    </RecoilRoot>
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
