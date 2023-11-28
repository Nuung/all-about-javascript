import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  // 아래는 layout에 감싸져 있지 않음, auth 획득 관련으로 독립시킴
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "create-account",
    element: <CreateAccount />
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;

`;


function App() {
  const [isLoading, setIsLoading] = useState(true);

  // firebase의 auth 체크 동안 로딩창 띄우기
  const init = async () => {
    // setTimeout(() => setIsLoading(false), 2000); // for testing 
    await auth.authStateReady();  // 최초 인증 상태가 완료될 때 promise return -> 파베 쿠키 & 토큰 인증동안 기다린다~
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}

    </Wrapper>
  );
}

export default App
