import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';

import UploadWidget from '../components/UploadWidget';
import { Cloudinary } from '@cloudinary/url-gen';
import Day from '../components/Day';
import EndAdventure from '../components/EndAdventure';
import SwiperSlideCurrent from '../components/SwiperSlide';

const TripDetails = () => {
  const {
    dayDetails,
    setDayDetails,
    tripDetails,
    setTripDetails,
    commentsObj,
    setCommentsObj,
    imageArray,
    setImageArray,
  } = useContext(StateContext);
  // console.log(imageArray);
  const { _id } = useParams();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'curatedtrips',
    },
  });

  // Gets all of the trip details //
  useEffect(() => {
    const fetchHandler = async () => {
      const res = await fetch(`/api/detail/${_id}`);
      const json = await res.json();
      setTripDetails(json.data);
      setDayDetails(json.data.arrayOfDays);
      setCommentsObj(json.data.comments);
      setImageArray(json.data.images);
      // console.log(json.data);
    };
    fetchHandler();
  }, [_id]);

  return (
    <StyledContainer>
      {tripDetails && (
        <>
          <div>
            <StyledHead>{tripDetails.title}</StyledHead>
            <StyledDuration>Duration: {tripDetails.days} Day(s)</StyledDuration>
            <StyledGallery>Image Gallery</StyledGallery>
            {/* <TripGallery> */}
            {tripDetails && imageArray === 0 ? (
              <StyledNoImg>*Currently No Images*</StyledNoImg>
            ) : (
              <SwiperSlideCurrent />
            )}
            <StyledWidgetContainer>
              <UploadWidget />
            </StyledWidgetContainer>{' '}
            {/* </TripGallery> */}
            <StyledDayContainer>
              {dayDetails.length &&
                dayDetails.map((day, index) => {
                  const column = `column-${index + 2}`;
                  const commentsArray = commentsObj && commentsObj[column];
                  return (
                    <Day
                      day={day}
                      index={index}
                      commentsArray={commentsArray}
                    />
                  );
                })}
            </StyledDayContainer>
          </div>
          <EndAdventure />
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  /* width: 100vw; */
  min-height: calc(100vh - 68.5px);
  background-color: #6d98ba;
`;

const StyledHead = styled.h2`
  text-align: center;
  /* padding: 30px 10px 10px 10px; */
  font-size: 35px;
  color: black;
  letter-spacing: 3px;
`;

const StyledDuration = styled.p`
  text-align: center;
  padding-bottom: 50px;
  font-size: 20px;
`;

const StyledDayContainer = styled.div`
  /* margin: auto; */
  /* padding: 5px; */
  /* border: 2px solid orange; */
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 24px;
  /* max-width: 1900px;
  place-items: center; */
  /* height: 100%; */
  margin-left: 50px;
  /* padding: 5px; */
  min-width: 350px;
`;

const StyledGallery = styled.h3`
  text-align: center;
  /* margin-top: 20px; */
  margin-bottom: 30px;
  font-size: 25px;
`;

const StyledWidgetContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledNoImg = styled.p`
  font-size: 20px;
  text-align: center;
  padding: 20px;
`;

export default TripDetails;
