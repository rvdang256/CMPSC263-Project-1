import React from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';

const Login2 = () => {
  const router = useRouter();

  function handleSignUpClick() {
    router.push('/signUp');
  }
  return (
    <Container>
      <LoginForm>
        <Title>Login</Title>
        <FormGroup>
          <Input placeholder ="Username" type="text" id="username" name="username" required />
        </FormGroup>
        <FormGroup>
          <Input placeholder ="Password" type="password" id="password" name="password" required />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>

       <BackButton onClick={handleSignUpClick}>Sign Up</BackButton>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: "Gill Sans", sans-serif;
`;

const LoginForm = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(5, 5, 5, 1);
  padding: 40px;
  width: 350px;
  height: 270px;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  align-items: center;


`;

const Input = styled.input`
  width: 93%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 30px;
  
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 1.5vw;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.h1`

font-size: 15px;
margin-top: 55px;
margin-left: 280px;
color: gray; /* Sets the text color to gray */
text-decoration: underline;
cursor: pointer;
`;

export default Login2;