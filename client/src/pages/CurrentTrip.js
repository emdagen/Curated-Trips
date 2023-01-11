import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
import SwiperSlidesCurrent from '../components/SwiperSlideCurrent';

const CurrentTrip = () => {
  const { userData, setCurrentTrips, currentTrips } = useContext(StateContext);

  useEffect(() => {
    const getCurrentTrips = async () => {
      const res = await fetch(`/api/currentTrips/${userData._id}`);
      const json = await res.json();
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
          <SwiperSlidesCurrent />
        </StyledCurrentTrips>
      )}
    </>
  );
};

const StyledCurrentTrips = styled.div`
  min-height: calc(100vh - 50px);
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

export default CurrentTrip;
