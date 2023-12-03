import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { auth } from "./firebase";

import Home from "./routes/home";
import Profile from "./routes/profile";
import SignIn from "./routes/signIn";
import SignUp from "./routes/signUp";

import Layout from "./components/layout";
import LoadingComponent from "./components/loadingComponent";
import ProtectedRouteComponent from "./components/protectedRouteComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRouteComponent><Layout /></ProtectedRouteComponent>,
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
  // 아래는 layout에 감싸져 있지 않음 -> auth 획득 필요 없음
  // 비로그인 접근 가능 페이지
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #222;
    color: white;
    font-family: "Pretendard";
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
      {isLoading ? <LoadingComponent /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
