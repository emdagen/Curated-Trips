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
import { ListItem } from '@mui/material';

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
    backgroundColor: theme.palette.mode === 'light' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.light,
    // notchedOutline: {
    //   borderWidth: '1px',
    //   borderColor: 'black !important',
    // },
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
            style={{
              opacity: '0.8',
              backgroundColor: 'black',
            }}
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              // width: 500,
              height: 350,
              input: { color: 'white' },
            }}
          >
            <StyledH1>New Adventures</StyledH1>
            <StyledH2>Start a new trip</StyledH2>
            <StyledLabel>Name :</StyledLabel>

            <StyledTextField
              autoFocus
              type='text'
              id='filled-required'
              label='Required'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Name of Adventure'
              variant='filled'
              value={title}
              sx={{
                input: { color: 'black', background: 'white' },
              }}
            />
            <StyledLabel>Number of Days :</StyledLabel>

            <StyledTextField
              // autoFocus
              onChange={(e) => setDuration(e.target.value)}
              placeholder='Duration of Stay'
              value={duration}
              id='filled-number'
              label='Duration'
              type='number'
              variant='filled'
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                input: {
                  color: 'black',
                  background: 'white',
                  filled: 'black',
                },
              }}
            />
            <div>
              <StyledButton variant='outlined' type='submit'>
                Let's Build !
              </StyledButton>
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

// const StyledButton = styles.div`
// margin-top: 8px;
// `;

const StyledLabel = styles.p`
margin-top: 8px;
margin-bottom:8px;
font-weight:bold;
color:white;
`;
const StyledH1 = styles.h1`
color:white;
`;
const StyledH2 = styles.h2`
color:white;
`;

const StyledTextField = styled(TextField)`
  /* .MuiInputBase-root {
    outline: 1px solid white;
  } */
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused,
  .MuiInputBase-root,
  label {
    color: black !important;
  }

  &:hover,
  &:focus {
    label {
      color: black !important;
      transition: unset;
    }
    .MuiInputBase-root {
      color: white !important;
      outline: 2px solid black;
    }
  }
  .css-15mnzpi-MuiInputBase-root-MuiFilledInput-root::after {
    border-bottom: none !important;
  }
`;
const StyledButton = styled(Button)`
  color: white;
  margin-top: 8px;
  /* border: 2px solid white-space; */
`;
export default CreateForm;
