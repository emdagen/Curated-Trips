import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CurrentTrip = () => {
  const { userData, setCurrentTrips, currentTrips } = useContext(StateContext);

  useEffect(() => {
    const getCurrentTrips = async () => {
      const res = await fetch(`/api/currentTrips/${userData._id}`);
      const json = await res.json();
      // console.log(json);
      setCurrentTrips(json.data);
    };
    getCurrentTrips();
  }, []);

  return (
    <>
      {currentTrips && (
        <StyledCurrentTrips>
          <StyledHead>List of Adventures</StyledHead>
          <StyledEx>Click on a Trip to View/Edit</StyledEx>
          <StyledContainer>
            {currentTrips.map((trip, index) => {
              console.log(trip);
              return (
                <StyledNav to={`/details/${trip._id}`}>
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
  /* border: 2px solid blue; */
  min-height: calc(100vh - 50px);
  min-width: 100vw;
`;

const StyledHead = styled.h2`
  text-align: center;
  font-size: 30px;
  padding: 80px 10px 10px 10px;
`;

const StyledContainer = styled.div`
  margin-top: 50px;
  display: flex;
  gap: 16px;
  /* border: 2px solid pink; */
  display: flex;
  justify-content: space-evenly;
`;

const StyledTripContainer = styled.div`
  /* border: 3px solid purple; */
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

const StyledEx = styled.p`
  font-size: 20px;
  text-align: center;
  padding-bottom: 50px;
`;

export default CurrentTrip;
