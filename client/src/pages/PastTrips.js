import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CurrentTrip = () => {
  const { userData, pastTrip, setPastTrip } = useContext(StateContext);

  // gets the ended/edited trips
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
          <StyledHead>Past Adventures</StyledHead>
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
  margin-top: 80px;
  display: flex;
  gap: 16px;
  border: 2px solid pink;
  display: flex;
  justify-content: space-evenly;
`;
const StyledTripContainer = styled.div`
  background-color: #d6ccc2;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  text-align: center;
  padding: 20px;
  /* height: 30vh; */
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

export default CurrentTrip;
