import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context/StateContext';

const Navbar2 = () => {
  
  const {user, setUser} = useStateContext();
  const router = useRouter();

  function handleSignOutClick(){
    setUser(null);
    router.push('/');

  }

  function handleLoginClick() {
    router.push('/loginPage');
  }

  function handleHomeClick() {
    router.push('/');

  }

  function handleExerciseClick() {
    if (user != null) {
    router.push('/Exercises');}
    else{
      router.push('/loginPage');
    }
  }

  function handleNutritionClick() {
    if (user != null) {
    router.push('/Nutrition');}
    else{
      router.push('/loginPage');
    }

  }

  return (
    <Container>
      <Holder>
        <LogoBox>
          Fitness<span>Journey</span>
        </LogoBox>

        <NavigationButtonHolder>

          
          <NavigationElement onClick={handleHomeClick}>Home</NavigationElement>
          <NavigationElement onClick={handleExerciseClick}>Exercises</NavigationElement>
          <NavigationElement onClick={handleNutritionClick}>Nutrition</NavigationElement>
          {user && 
          <LoginButton onClick={handleSignOutClick}>Sign Out</LoginButton>}
          {user != null ?
          <User>{user.email}</User>
          : // no logged in user
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>}
        </NavigationButtonHolder>
        
      </Holder>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;
  background-color: #f5f5f5; /* Light gray background */
`;

const User = styled.div`
font-size: 1vw;
font-weight: bold;
font-family: "Inter", Helvetica, Arial, -apple-system, sans-serif;
color: #12a9e0; /* Dark gray text color */
  
`;

const Holder = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  font-size: 2vw;
  font-weight: bold;
  font-family: "Inter",Helvetica,Arial,-apple-system,sans-serif;
  color: #333; /* Dark gray text color */
  span {
    color: #12a9e0; /* Blue background color */ /* Blue text color */
  }
`;

const NavigationButtonHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 3vw;

`;






const NavigationElement = styled.button`
  --c: #229091; /* the color*/
  --_g: linear-gradient(var(--c) 0 0) no-repeat;
  background: 
    var(--_g) calc(var(--_p,0%) - 100%) 0%,
    var(--_g) calc(200% - var(--_p,0%)) 0%,
    var(--_g) calc(var(--_p,0%) - 100%) 100%,
    var(--_g) calc(200% - var(--_p,0%)) 100%;
  background-size: 50.5% calc(var(--_p,0%)/2 + .5%);
  outline-offset: .1em;
  transition: background-size .4s, background-position 0s .4s;

  font-family: system-ui, sans-serif;
  font-size: 1vw;
  cursor: pointer;
  padding: 0.75vw ;
  font-weight: bold;
  border: none;
  box-shadow: 0 0 0 .1em inset var(--c);

  &:hover {
    --_p: 100%;
    transition: background-position .4s, background-size 0s;
  }

  &:active {
    box-shadow: 0 0 9e9q inset #0009;
    background-color: var(--c);
    color: #fff;
  }

  &.Login {
    color: yellow; /* Change the color to your desired value */
  }
`;

const LoginButton = styled(NavigationElement)`
  --c: #E95A49; 
`;


export default Navbar2;
