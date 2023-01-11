import { useContext, useEffect } from 'react';
import { StateContext } from '../context/StateContext';

//Swiper
import { Autoplay, Pagination, Navigation } from 'swiper';
import styles from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

//MUI Button
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

const SwiperSlidesCurrent = () => {
  const { userData, setCurrentTrips, currentTrips } = useContext(StateContext);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1583353858816-0b5850f04adf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      width: '100%',
    },
  ];

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 350,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

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
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
          style={{ width: '49%', height: '60%' }}
        >
          {currentTrips.map((trip) => {
            return (
              <SwiperSlide>
                <StyledContainer>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      minWidth: 300,
                      width: '100%',
                    }}
                  >
                    {images.map((image) => (
                      <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                          width: image.width,
                        }}
                      >
                        <ImageSrc
                          style={{ backgroundImage: `url(${image.url})` }}
                        />
                        <ImageBackdrop className='MuiImageBackdrop-root' />
                        <Image>
                          <Typography
                            component='span'
                            variant='subtitle1'
                            color='inherit'
                            sx={{
                              position: 'relative',
                              p: 4,
                              pt: 2,
                              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                          >
                            <StyledNavLink to={`/details/${trip._id}`}>
                              <h2>{trip.title}</h2>
                              <h3>Duration: {trip.days} Day(s)</h3>
                            </StyledNavLink>
                            <ImageMarked className='MuiImageMarked-root' />
                          </Typography>
                        </Image>
                      </ImageButton>
                    ))}
                  </Box>
                </StyledContainer>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

const StyledContainer = styles.div``;
const StyledNavLink = styles(NavLink)`
text-decoration:none;
color: white;
`;
export default SwiperSlidesCurrent;
