import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
const UserAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      {isAuthenticated && (
        <StyledUser>
          <StyledContainer>
            <UserName>{user.name}</UserName>
            <p>First Name: {user.given_name}</p>
            <p>Last Name: {user.family_name}</p>
            <p>Email: {user.email}</p>
            <p>Language Preference: {user.locale.toUpperCase()}</p>
          </StyledContainer>
        </StyledUser>
      )}
    </div>
  );
};
const StyledContainer = styled.div`
  width: 400px;
  min-height: 50vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  text-align: center;
`;
const UserName = styled.h2`
  text-align: center;
`;
export default UserAccount;
