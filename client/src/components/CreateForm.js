// import styled from 'styled-components';
import { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateForm = () => {
  const { setFormData, setBoardData, setUpdateDB, boardData } =
    useContext(StateContext);

  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...boardData, days: duration, title });
    setBoardData({ ...boardData, days: duration, title }); //updates Beautiful DnD board
    setUpdateDB(true); //updates MongoDB
    setTitle('');
    setDuration('');
    // console.log('hello');
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} alignItems='center' justifyContent='center'>
        <Grid item xs>
          <NavLink to={'/current'}>
            <Item
              component='div'
              sx={{
                // width: 300,
                height: 300,
                backgroundImage: `url(
                    'https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                  )`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              In Progress
            </Item>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Item
            component='form'
            noValidate
            // autoComplete='off'
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              // width: 500,
              height: 300,
            }}
          >
            <h1>New Adventures</h1>
            <h2>Start a new trip</h2>
            <p>Name :</p>

            <TextField
              autoFocus
              type='text'
              id='outlined-required'
              label='Required'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Name of Adventure'
              value={title}
            />
            <p>Number of Days :</p>

            <TextField
              // autoFocus
              onChange={(e) => setDuration(e.target.value)}
              placeholder='Duration of Stay'
              value={duration}
              id='outlined-number'
              label='Number'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div>
              <Button variant='outlined' type='submit'>
                Let's Build !
              </Button>
            </div>
          </Item>
        </Grid>

        <Grid item xs>
          <NavLink to={'/archived'}>
            <Item
              component='div'
              sx={{
                // width: 300,
                height: 300,
                backgroundImage: `url(
                    'https://images.unsplash.com/photo-1583858665594-a83667519ac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGZlc3RpdmFsfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                  )`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              Archived
            </Item>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};
// const StyledContainer = styled.div`
//   margin-bottom: 15px;
//   border: 2px solid purple;
//   min-width: 600px;
//   height: 600px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   background-color: #8ec5fc;
//   background-image: linear-gradient(
//     62deg,
//     #8ec5fc 7%,
//     #d0d1c9 39%,
//     #e8e1e1 74%
//   );
//   background-size: 400% 400%;
//   animation: gradient 15s ease infinite;
//   @keyframes gradient {
//     0% {
//       background-position: 0% 50%;
//     }
//     50% {
//       background-position: 100% 50%;
//     }
//     100% {
//       background-position: 0% 50%;
//     }
//   }
// `;

// const StyledForm = styled.form`
//   height: 550px;
//   width: 500px;
//   border: 2px solid white;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 10px;
//   padding: 100px;
//   background-color: #d6ccc2;
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
//     rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
// `;

// const Input = styled.input`
//   height: 50px;
//   font-size: 20px;
//   /* border-radius: 10px; */
// `;

// const StepOne = styled.h3`
//   text-align: center;
//   font-size: 25px;
// `;

// const Submit = styled.button`
//   margin-top: 15px;
//   text-decoration: none;
//   height: 50px;
//   display: inline-block;
//   padding: 0.35em 1.2em;
//   border: 0.2em solid #d6ccc2;

//   border-radius: 0.12em;
//   box-sizing: border-box;
//   text-decoration: none;
//   color: #d6ccc2;
//   text-align: center;
//   transition: all 0.2s;
//   font-weight: 600;
//   font-size: 20px;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   :hover {
//     color: #000000;
//     background-color: #ffffff;
//   }
// `;

// const StyledDescription = styled.h2`
//   text-align: center;
//   font-size: 40px;
// `;

// const StyledDescription2 = styled.h3`
//   /* margin-top: 30px; */
// `;

// const StyledCurrent = styled.div`
//   height: 550px;
//   width: 500px;
//   border-radius: 10px;
//   background-image: url('https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80');
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

// const StyledPast = styled.div`
//   height: 550px;
//   width: 500px;
//   border-radius: 10px;
//   background-image: url('https://images.unsplash.com/photo-1583858665594-a83667519ac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGZlc3RpdmFsfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60');
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

// const StyledLink = styled.p`
//   height: 550px;
//   border-radius: 10px;
//   font-size: 40px;
//   font-weight: bold;
//   color: black;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 2px solid white;
//   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
//     rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
// `;

export default CreateForm;
//     <StyledContainer>
//       <NavLink to={'/current'}>
//         <StyledCurrent>
//           <StyledLink>In Progress</StyledLink>
//         </StyledCurrent>
//         {/* <Box
//           component='div'
//           sx={{
//             width: 300,
//             height: 300,
//             backgroundImage: `url(
//                 'https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
//               )`,
//             backgroundRepeat: 'no-repeat',
//             backgroundSize: 'cover',
//           }}
//         >
//           In Progress
//         </Box> */}
//       </NavLink>
//       <StyledForm onSubmit={(e) => handleSubmit(e)}>
//         <StyledDescription>New Adventures</StyledDescription>
//         <StepOne>Start a new trip</StepOne>
//         <StyledDescription2>Name :</StyledDescription2>
//         <Input
//           type='text'
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder='Name of Adventure'
//           value={title}
//         />
//         <StyledDescription2>Number of Days :</StyledDescription2>
//         <Input
//           type='number'
//           onChange={(e) => setDuration(e.target.value)}
//           placeholder='Duration of Stay'
//           value={duration}
//         />

//         <Submit type='submit'>Let's Build !</Submit>
//       </StyledForm>
//       <NavLink to={'/archived'}>
//         <StyledPast>
//           <StyledLink>Past Trips</StyledLink>
//         </StyledPast>
//       </NavLink>
//     </StyledContainer>
