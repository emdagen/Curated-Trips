import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { Cloudinary } from '@cloudinary/url-gen';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';
import styled from 'styled-components';

const SwiperSlideCurrent = () => {
  const { tripDetails, setTripDetails, imageArray, setImageArray } =
    useContext(StateContext);

  const { _id } = useParams();
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'curatedtrips',
    },
  });
  // console.log(imageArray);
  useEffect(() => {
    const fetchHandler = async () => {
      const res = await fetch(`/api/detail/${_id}`);
      const json = await res.json();
      setImageArray(json.data.images);
      // console.log(json.data);
    };
    fetchHandler();
  }, [_id]);

  return (
    <>
      {imageArray && (
        <StyledSwiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {imageArray &&
            imageArray.map((image) => {
              console.log(image);
              return <StyledImage key={image} image={image}></StyledImage>;
            })}
        </StyledSwiper>
      )}
    </>
  );
};
const StyledImage = styled(SwiperSlide)`
  width: 100%;
  min-height: 400px;
  background-color: grey;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
`;
const StyledSwiper = styled(Swiper)`
  margin: 24px;
`;

export default SwiperSlideCurrent;
