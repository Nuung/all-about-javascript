import styled from "styled-components";

// firebase error을 key-value 매핑하기
// const errors = {
//   "auth/email-already-in-use": "That email already exists",
//   "auth/invalid-email": "That email was something wrong",
//   "auth/weak-password": "That password is too week, make more powerfull"
// }
// auth/too-many-requests

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 550px;
  padding: 30px;
  background-color: #111;
  box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.5);
  margin-top: 10%;
  border-radius: 15px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const SubTitle = styled.span`
  font-style: italic;
  font-weight: bolder;
  font-size: 1.7rem;
  margin-top: 20px;
  color: #dfdbff;
`;

export const Form = styled.form`
  margin-top: 35px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1D9BF0;
  }
`;