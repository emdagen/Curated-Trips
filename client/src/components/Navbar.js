import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import { useContext } from 'react';
import { BiLogOut, BiUser } from 'react-icons/bi';

const Navbar = () => {
  const { isLoading, logout } = useAuth0();
  const { userData } = useContext(StateContext);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <MainContainer>
      <StyledNav>
        <StyledNavigation to={`/`}>
          <StyledP>Create</StyledP>
        </StyledNavigation>
        <StyledNavigation to={`/current`}>
          <StyledP>View Trips </StyledP>
        </StyledNavigation>
        <StyledNavigation to={`/archived`}>
          <StyledP>Archived </StyledP>
        </StyledNavigation>
      </StyledNav>

      <StyledNavigation to={`/`}>
        <StyledName>Curated Trips</StyledName>
      </StyledNavigation>
      {userData && (
        <StyledRightNav>
          <StyledP>
            Hi, <span>{userData.name}</span>.{' '}
          </StyledP>
          <BiLogOut
            size={25}
            onClick={() => logout({ returnTo: window.location.origin })}
          />

          <StyledNavigation to={`/account`}>
            <BiUser size={23} />
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

const StyledName = styled.h1`
  margin-left: 85px;
  font-size: 38px;
`;
const StyledNav = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  /* border: 2px solid orange; */
`;
const StyledNavigation = styled(NavLink)`
  text-decoration: none;
  margin-top: 3px;
  color: black;
  :active {
    text-decoration: 2px underline black;
  }
`;
const StyledP = styled.p`
  font-size: 20px;
  margin-left: 5px;
`;
export default Navbar;
