import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { Form, Wrapper, Title, SubTitle, Input, Switcher, Error } from "../components/authComponents";
import GithubButton from "../components/githubButton";


export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value);
    }
    else if (name === "password") {
      setPassword(value);
    }
  };

  // firebase AUTH 를 위한 회원가입 로직 처리
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    // if (password.length < 6) return;
    // console.log(name, email, password); // for testing 
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      else {
        setError(`undefined error, ${e}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Sign-In to</Title>
      <SubTitle>GYMSHOT</SubTitle>
      <Form onSubmit={onSubmit}>
        <Input name="email" value={email} placeholder="Email" type="email" required onChange={onChange} />
        <Input name="password" value={password} placeholder="Password" type="password" required onChange={onChange} />
        <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? <Link to="/sign-up">Create one! &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}