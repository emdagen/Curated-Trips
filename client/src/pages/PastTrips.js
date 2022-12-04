import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CurrentTrip = () => {
  const { userData, pastTrip, setPastTrip } = useContext(StateContext);

  useEffect(() => {
    const getPastTrips = async () => {
      const res = await fetch(`/api/pastTrips/${userData._id}`);
      const json = await res.json();
      // console.log(json);
      setPastTrip(json.data);
    };
    getPastTrips();
  }, []);

  return (
    <>
      {pastTrip && (
        <StyledCurrentTrips>
          <StyledHead>List of Adventures</StyledHead>
          <StyledEx>Click on a Trip to View/Edit</StyledEx>
          <StyledContainer>
            {pastTrip.map((trip, index) => {
              // console.log(trip);
              return (
                <StyledNav to={`/archived/${trip._id}`}>
                  <StyledTripContainer key={trip.index}>
                    <StyledTripName>{trip.title}</StyledTripName>
                    <StyledTripDetails>
                      Duration: {trip.days} Day(s){' '}
                    </StyledTripDetails>
                    <StyledTripDetails>Trip ID: {trip._id}</StyledTripDetails>
                  </StyledTripContainer>
                </StyledNav>
              );
            })}
          </StyledContainer>
        </StyledCurrentTrips>
      )}
    </>
  );
};

const StyledCurrentTrips = styled.div`
  border: 2px solid blue;
  min-height: 100vh;
  min-width: 100vw;
`;
const StyledHead = styled.h2`
  text-align: center;
  font-size: 30px;
  padding: 50px 10px 10px 10px;
`;
const StyledContainer = styled.div`
  display: flex;
  gap: 16px;
  /* border: 2px solid pink; */
`;
const StyledTripContainer = styled.div`
  border: 3px solid purple;
  text-align: center;
  padding: 20px;
`;
const StyledNav = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const StyledTripName = styled.h3`
  text-align: center;
  font-size: 25px;
  padding: 10px;
`;
const StyledTripDetails = styled.p`
  font-size: 20px;
`;
const StyledEx = styled.p`
  font-size: 20px;
  text-align: center;
  padding-bottom: 50px;
`;
export default CurrentTrip;
