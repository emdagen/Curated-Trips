import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
// import { format, parseISO } from 'date-fns';
import { Cloudinary } from '@cloudinary/url-gen';
import Day from '../components/Day';
import ArchivedDay from '../components/ArchivedDay';
import SwiperCloudinarySlide from '../components/SwiperSlideCloudinary';

const ArchivedDetails = () => {
  const { pastTrip } = useContext(StateContext);
  const [archivedDetail, setArchivedDetail] = useState(null);
  const [commentsObj, setCommentsObj] = useState(null);
  // console.log(archivedDetail);

  const { _id } = useParams();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'curatedtrips',
    },
  });

  // gets ended/edited trip details //
  useEffect(() => {
    const getArchivedTrip = async () => {
      const res = await fetch(`/api/archived-trip/${_id}`);
      const json = await res.json();
      // console.log(json);
      setArchivedDetail(json.data);
    };
    getArchivedTrip();
  }, [_id]);

  return (
    <>
      {archivedDetail && (
        <StyledPastTrip>
          <StyledTitle>
            <StyledName>{archivedDetail.title}</StyledName>
            <StyledDuration>
              <StyledSpan> Duration:</StyledSpan> {archivedDetail.days} Day(s)
            </StyledDuration>
          </StyledTitle>
          <StyledH3>
            <StyledH2>Image Gallery</StyledH2>
          </StyledH3>
          <SwiperCloudinarySlide />
          <StyledDayContainer>
            {archivedDetail &&
              archivedDetail.arrayOfDays.map((day, index) => {
                const column = `column-${index + 2}`;
                const commentsArray =
                  archivedDetail.comments && archivedDetail.comments[column];
                // console.log(archivedDetail);
                // console.log(commentsArray);
                return (
                  <ArchivedDay
                    day={day}
                    index={index}
                    commentsArray={commentsArray}
                  />
                );
              })}
          </StyledDayContainer>
        </StyledPastTrip>
      )}
    </>
  );
};

const StyledPastTrip = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 50px;
  background-color: #6d98ba; */
  min-height: calc(100vh - 68.5px);
  /* padding-bottom: 30px; */
  background-color: #e0e0e0;
`;

const StyledDayContainer = styled.div`
  margin-left: 50px;
  padding: 5px;
  min-width: 350px;
  /* border: 2px solid purple; */
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 24px;
  /* place-items: center; */
  /* display: flex;
  justify-content: space-around; */
`;

const StyledTitle = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StyledH3 = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledName = styled.h2`
  font-size: 30px;
`;

const StyledDuration = styled.p`
  font-size: 20px;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const StyledH2 = styled.h2`
  font-size: 25px;
  padding: 7px;
  /* border: 3px double black; */
  margin-top: 8px;
`;

export default ArchivedDetails;
