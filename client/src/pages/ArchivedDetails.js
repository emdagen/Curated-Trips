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
          <h2>{archivedDetail.title}</h2>
          <p>Duration: {archivedDetail.days} Day(s)</p>
          <h3>Image Gallery</h3>
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
const StyledPastTrip = styled.div``;
const StyledImage = styled.img`
  width: 300px;
  max-height: 400px;
`;
const StyledGallery = styled.div``;
const StyledDayContainer = styled.div``;
export default ArchivedDetails;
