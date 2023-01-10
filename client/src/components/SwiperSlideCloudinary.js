import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const SwiperCloudinarySlide = () => {
  const [archivedDetail, setArchivedDetail] = useState(null);
  const { _id } = useParams();

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
          {archivedDetail.images &&
            archivedDetail.images.map((image) => {
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

export default SwiperCloudinarySlide;
