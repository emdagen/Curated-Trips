import { Autoplay, Pagination, Navigation } from 'swiper';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const SwiperSlides = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          <StyledContainer
            style={{
              backgroundImage: `url(${'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2066&q=80'})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center top',
              height: '600px',
            }}
          ></StyledContainer>
        </SwiperSlide>
        {/* <SwiperSlide>
          <StyledContainer
            style={{
              backgroundImage: `url(${'https://cdn.pixabay.com/photo/2017/06/04/16/33/road-2371503_960_720.jpg'})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '600px',
            }}
          ></StyledContainer>
        </SwiperSlide> */}
        <SwiperSlide>
          <StyledContainer
            style={{
              backgroundImage: `url(${'https://images.unsplash.com/photo-1470218091926-22a08a325802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2066&q=80'})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '600px',
            }}
          ></StyledContainer>
        </SwiperSlide>
        {/* <SwiperSlide>
          {' '}
          <StyledContainer
            style={{
              backgroundImage: `url(${'https://images.unsplash.com/photo-1567062691477-fcbc8bbdf5b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '600px',
            }}
          ></StyledContainer>
        </SwiperSlide> */}
        <SwiperSlide>
          {' '}
          <StyledContainer
            style={{
              backgroundImage: `url(${'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '600px',
            }}
          ></StyledContainer>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

const StyledContainer = styled.div``;
export default SwiperSlides;
