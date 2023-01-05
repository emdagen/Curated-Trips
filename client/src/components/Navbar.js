import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { StateContext } from '../context/StateContext';
import { useContext } from 'react';
// import { BiLogOut, BiUser } from 'react-icons/bi';

// const Navbar = () => {
//   const { isLoading, logout } = useAuth0();
//   const { userData } = useContext(StateContext);

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }
//   return (
//     <MainContainer>
//       <StyledNav>
//         <StyledNavigation to={`/`}>
//           <StyledP>Create</StyledP>
//         </StyledNavigation>
//         <StyledNavigation to={`/current`}>
//           <StyledP>View Trips </StyledP>
//         </StyledNavigation>
//         <StyledNavigation to={`/archived`}>
//           <StyledP>Archived </StyledP>
//         </StyledNavigation>
//       </StyledNav>

//       <StyledNavigation to={`/`}>
//         <StyledName>Curated Trips</StyledName>
//       </StyledNavigation>
//       {userData && (
//         <StyledRightNav>
//           <StyledP>
//             Hi, <span>{userData.name}</span>.{' '}
//           </StyledP>
//           <BiLogOut
//             size={25}
//             onClick={() => logout({ returnTo: window.location.origin })}
//           />

//           <StyledNavigation to={`/account`}>
//             <BiUser size={23} />
//           </StyledNavigation>
//         </StyledRightNav>
//       )}
//     </MainContainer>

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

const pages = ['Create', 'Current', 'Archived'];
const settings = ['Account', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isLoading, logout } = useAuth0();
  const { userData } = useContext(StateContext);
  console.log(userData);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}{' '}
          {/* <p>Some icon</p> */}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Curated Trips
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              {/* <MenuIcon /> */} <p>menu</p>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={`/`}>
                  <Typography textAlign='center'>Create</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={`/current`}>
                  <Typography textAlign='center'>Current</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to={`/archived`}>
                  <Typography textAlign='center'>Archived</Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Curated Trips
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to={`/`}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[0]}
              </Button>
            </NavLink>
            <NavLink to={`/current`}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[1]}
              </Button>
            </NavLink>
            <NavLink to={`/archived`}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[2]}
              </Button>
            </NavLink>
          </Box>
          {userData && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData.nickname} src={userData.picture} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <NavLink to={`/account`}>
                    <Typography textAlign='center'>Account</Typography>
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign='center'
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
