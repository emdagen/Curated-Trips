import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import sample from '../video/pictures.mp4';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <MainContainer>
      <Video autoPlay loop muted src={sample} type='video/mp4' />
      <StyledLoginContainer>
        <StyledH1>Welcome to Cur(e)ated Trips</StyledH1>
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
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 32px;
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

const StyledH1 = styled.h1`
  font-size: 60px;
`;

export default Login;
