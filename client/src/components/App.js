import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';

//pages
import Login from '../pages/Login';
import Homepage from '../pages/Homepage';
import Navbar from './Navbar';
import UserAccount from '../pages/UserAccount';
import PastTrips from '../pages/PastTrips';
import CurrentTrip from '../pages/CurrentTrip';
import TripDetails from '../pages/TripDetails';
import ArchivedDetails from '../pages/ArchivedDetails';

//api, libraries
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { setUserData, userData, setLoadingObj, loadingObj } =
    useContext(StateContext);

  useEffect(() => {
    const userInfo = async () => {
      // console.log(user);
      try {
        const result = await fetch(`/api/verify-user`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const response = await result.json();
        // console.log(response);
        setUserData(response.data);
        setLoadingObj({ ...loadingObj, user: 'verify' });
      } catch (err) {
        console.log(err);
      }
    };
    isAuthenticated && userInfo();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <StyledApp>
        {isAuthenticated && loadingObj.user === 'verify' ? (
          <>
            {isAuthenticated && userData && <Navbar />}
            <Routes>
              <Route>
                <Route path='/' element={<Homepage />} />
                <Route path='/account' element={<UserAccount />} />
                <Route path='/archived' element={<PastTrips />} />
                <Route path='/current' element={<CurrentTrip />} />
                <Route path='/details/:_id' element={<TripDetails />} />
                <Route path='/archived/:_id' element={<ArchivedDetails />} />
              </Route>
            </Routes>
          </>
        ) : !isLoading && loadingObj.user === 'loading' ? (
          loadingObj.user === 'verify' || isAuthenticated ? (
            <h1>Loading ... </h1>
          ) : (
            <Login />
          )
        ) : (
          <h1>Something</h1>
        )}
      </StyledApp>
    </BrowserRouter>
  );
};

const StyledApp = styled.div`
  min-height: 100vh;
  /* border: 2px solid orange; */
`;
export default App;
