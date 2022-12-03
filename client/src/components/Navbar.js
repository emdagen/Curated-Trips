import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { useContext } from 'react';

const Navbar = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
  const { setUserData, userData } = useContext(StateContext);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <MainContainer>
      <StyledNav>
        <StyledNavigation to={`/`}>
          <p>Create</p>
        </StyledNavigation>
        <StyledNavigation to={`/current`}>
          <p>View Trips </p>
        </StyledNavigation>
        <StyledNavigation to={`/archived`}>
          <p>Archived </p>
        </StyledNavigation>
      </StyledNav>

      <StyledNavigation to={`/`}>
        <StyledName>Curated Trips</StyledName>
      </StyledNavigation>
      {userData && (
        <StyledRightNav>
          <p>
            Welcome back, <span>{userData.name}</span>.{' '}
          </p>
          <StyledLogout
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </StyledLogout>
          <StyledNavigation to={`/account`}>
            <p>Account</p>
          </StyledNavigation>
        </StyledRightNav>
      )}
    </MainContainer>
  );
};
const MainContainer = styled.div`
  height: 50px;
  background-color: #cae9ff;
  width: 100vw;
  padding-right: 20px;
  /* border: 2px solid yellow; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledRightNav = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  /* border: 2px solid orange; */
`;
const StyledLogout = styled.button`
  display: inline-block;
  padding: 0.15em 0.5em;
  border: 0.2em solid #d6ccc2;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #d6ccc2;
  text-align: center;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;
const StyledName = styled.h1`
  margin-left: 180px;
`;
const StyledNav = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  /* border: 2px solid orange; */
`;
const StyledNavigation = styled(NavLink)`
  text-decoration: none;
  color: black;
  :active {
    text-decoration: 2px underline black;
  }
`;
export default Navbar;
