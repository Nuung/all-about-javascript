import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth } from "../firebase";
import { Form, Wrapper, Title, SubTitle, Input, Switcher, Error } from "../components/authComponents";
import GithubButton from "../components/githubButton";


export default function SingUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "name") {
      setName(value);
    }
    else if (name === "email") {
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
    if (isLoading || name === "" || email === "" || password === "") return;
    // if (password.length < 6) return;
    // console.log(name, email, password); // for testing 
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name
      });
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
      <Title>Sign-Up to</Title>
      <SubTitle>GYMSHOT</SubTitle>
      <Form onSubmit={onSubmit}>
        <Input name="name" value={name} placeholder="Name" type="text" required onChange={onChange} />
        <Input name="email" value={email} placeholder="Email" type="email" required onChange={onChange} />
        <Input name="password" value={password} placeholder="Password" type="password" required onChange={onChange} />
        <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/sign-in">Login! &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}