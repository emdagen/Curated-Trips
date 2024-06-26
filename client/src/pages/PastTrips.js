import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SwiperSlidesPast from '../components/SwiperSlidePast';

const ArchivedTrip = () => {
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
        <StyledPastTrips>
          <StyledHead>List of Archived Trips</StyledHead>
          <StyledEx>Click on a Trip to View</StyledEx>
          <SwiperSlidesPast />
        </StyledPastTrips>
      )}
    </>
  );
};
const StyledPastTrips = styled.div`
  min-height: calc(100vh - 50px);
  background-color: #e0e0e0;
`;

const StyledHead = styled.h2`
  text-align: center;
  font-size: 30px;
  padding: 80px 10px 10px 10px;
`;

const StyledEx = styled.p`
  font-size: 20px;
  text-align: center;
  padding-bottom: 50px;
`;

export default ArchivedTrip;
