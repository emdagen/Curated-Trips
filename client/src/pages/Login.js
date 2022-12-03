import styled, { keyframes } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import sample from '../video/pictures.mp4';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <MainContainer>
      <Video autoPlay loop muted src={sample} type='video/mp4' />
      <StyledLoginContainer>
        <h1>Welcome to Cur(e)ated Trips</h1>
        <StyledDescription>
          A travel itinerary building app made for adventure seekers.
        </StyledDescription>

        <div>
          <StyledBtn onClick={() => loginWithRedirect()}>
            Log In / Sign up
          </StyledBtn>
        </div>
      </StyledLoginContainer>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0; */
  /* 
  --s: 25vmin;
  --p: calc(var(--s) / 2);
  --c1: #bcb8b1;
  --c2: #3e5c76;
  --c3: #748cab;
  --bg: var(--c3);
  --d: 12000ms;
  --e: cubic-bezier(0.76, 0, 0.24, 1);

  background-color: var(--bg);
  background-image: linear-gradient(45deg, var(--c1) 25%, transparent 25%),
    linear-gradient(-45deg, var(--c1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--c2) 75%),
    linear-gradient(-45deg, transparent 75%, var(--c2) 75%);
  background-size: var(--s) var(--s);
  background-position: calc(var(--p) * 1) calc(var(--p) * 0),
    calc(var(--p) * -1) calc(var(--p) * 1),
    calc(var(--p) * 1) calc(var(--p) * -1),
    calc(var(--p) * -1) calc(var(--p) * 0);
  animation: color var(--d) var(--e) infinite,
    position var(--d) var(--e) infinite;

  @keyframes color {
    0%,
    25% {
      --bg: var(--c3);
    }
    26%,
    50% {
      --bg: var(--c1);
    }
    51%,
    75% {
      --bg: var(--c3);
    }
    76%,
    100% {
      --bg: var(--c2);
    }
  }

  @keyframes position {
    0% {
      background-position: calc(var(--p) * 1) calc(var(--p) * 0),
        calc(var(--p) * -1) calc(var(--p) * 1),
        calc(var(--p) * 1) calc(var(--p) * -1),
        calc(var(--p) * -1) calc(var(--p) * 0);
    }
    25% {
      background-position: calc(var(--p) * 1) calc(var(--p) * 4),
        calc(var(--p) * -1) calc(var(--p) * 5),
        calc(var(--p) * 1) calc(var(--p) * 3),
        calc(var(--p) * -1) calc(var(--p) * 4);
    }
    50% {
      background-position: calc(var(--p) * 3) calc(var(--p) * 8),
        calc(var(--p) * -3) calc(var(--p) * 9),
        calc(var(--p) * 2) calc(var(--p) * 7),
        calc(var(--p) * -2) calc(var(--p) * 8);
    }
    75% {
      background-position: calc(var(--p) * 3) calc(var(--p) * 12),
        calc(var(--p) * -3) calc(var(--p) * 13),
        calc(var(--p) * 2) calc(var(--p) * 11),
        calc(var(--p) * -2) calc(var(--p) * 12);
    }
    100% {
      background-position: calc(var(--p) * 5) calc(var(--p) * 16),
        calc(var(--p) * -5) calc(var(--p) * 17),
        calc(var(--p) * 5) calc(var(--p) * 15),
        calc(var(--p) * -5) calc(var(--p) * 16);
    }
  } */
`;

const StyledLoginContainer = styled.div`
  min-height: 40vh;
  width: 40vw;
  border: 10px solid white;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d6ccc2;
  position: absolute;
`;
const StyledDescription = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
`;
const StyledBtn = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.2em solid #d6ccc2;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #d6ccc2;
  text-align: center;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;
const Video = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
export default Login;
