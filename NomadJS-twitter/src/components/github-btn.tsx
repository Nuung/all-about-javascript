import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Button = styled.button`
  background-color: white;
  margin-top: 50px;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provieder = new GithubAuthProvider();
      await signInWithPopup(auth, provieder);
      navigate("/");
    } catch (error) {
      // auth/account-exists-with-different-credential
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      continue with Github
    </Button>
  );
}