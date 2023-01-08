import styles from 'styled-components';
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
import ButtonBases from './ButtonBase';
import ButtonBases2 from './ButtonBase2';

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
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} alignItems='center' justifyContent='center'>
        <Grid item xs>
          <NavLink to={'/current'}>
            <ButtonBases />
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Item
            container
            component='form'
            noValidate
            spacing={4}
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              // width: 500,
              height: 350,
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
            <ButtonBases2 />
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

export default CreateForm;
