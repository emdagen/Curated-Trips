import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
// import { format, parseISO } from 'date-fns';
import { Cloudinary } from '@cloudinary/url-gen';
import Day from '../components/Day';
import ArchivedDay from '../components/ArchivedDay';

const ArchivedDetails = () => {
  const { pastTrip } = useContext(StateContext);
  const [archivedDetail, setArchivedDetail] = useState(null);
  const [commentsObj, setCommentsObj] = useState(null);
  console.log(archivedDetail);

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
      console.log(json);
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
          <StyledGallery>
            {archivedDetail.images &&
              archivedDetail.images.map((image) => {
                return (
                  <div>
                    <StyledImage key={image} src={image} />
                  </div>
                );
              })}
          </StyledGallery>

          <StyledDayContainer>
            {archivedDetail &&
              archivedDetail.arrayOfDays.map((day, index) => {
                const column = `column-${index + 2}`;
                const commentsArray =
                  archivedDetail.comments && archivedDetail.comments[column];
                // console.log(archivedDetail);
                console.log(commentsArray);
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
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const StyledImage = styled.img`
  width: 300px;
  max-height: 400px;
`;
const StyledGallery = styled.div`
  border: 2px double black;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;
const StyledDayContainer = styled.div`
  /* border: 2px solid purple; */
  display: flex;
  justify-content: space-around;
`;
const StyledTitle = styled.div`
  margin-top: 50px;
  /* border: 2px solid orange; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledH3 = styled.h3`
  /* border: 2px solid pink; */
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
  border: 3px double black;
`;
export default ArchivedDetails;
