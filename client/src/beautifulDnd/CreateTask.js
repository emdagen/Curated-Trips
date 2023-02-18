import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { StateContext } from '../context/StateContext';
import Button from '@mui/material/Button';

//Makes the activity cards
const CreateTask = () => {
  const { boardData, setBoardData, updateDB, setUpdateDB } =
    useContext(StateContext);
  //form data
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [activity, setActivity] = useState('');
  const [cost, setCost] = useState('');

  //Creates Card and adds to Activity Column & Updates MongoDB

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const taskId = uuid(); //id for cards in order for library to track position in column

    //data stored inside the card components
    const taskObj = {
      [taskId]: {
        id: taskId,
        content: '👽',
        title,
        duration,
        activity,
        cost,
      },
    };

    //update the boardData object with new Card data that was created
    const newStateObj = {
      ...boardData,
      columns: {
        ...boardData.columns,
        'column-1': {
          ...boardData.columns['column-1'],
          taskIds: [...boardData.columns['column-1'].taskIds, taskId],
        },
      },
      tasks: {
        ...boardData.tasks,
        ...taskObj,
      },
    };

    setBoardData(newStateObj); //updates Beautiful DnD board
    setUpdateDB(true); //updates MongoDB
  };

  return (
    <StyledCreate>
      <form onSubmit={handleSubmit}>
        <StyledDescription> Card Type:</StyledDescription>
        <StyledSelect
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value='' disabled>
            Please Select
          </option>
          <option value='Travel'>Travel</option>
          <option value='Hotel'>Hotel</option>
          <option value='Restaurant'>Restaurant</option>
          <option value='Activity'>Activity</option>
        </StyledSelect>
        <StyledDescription>Description:</StyledDescription>
        <StyledInput
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Details of your activity'
          value={title}
        />
        <StyledDescription>Duration:</StyledDescription>
        <StyledInput
          type='number'
          onChange={(e) => setDuration(e.target.value)}
          placeholder='The estimated duration'
          value={duration}
        />
        <StyledDescription>Cost:</StyledDescription>
        <StyledInput
          type='number'
          onChange={(e) => setCost(e.target.value)}
          placeholder='The estimated cost'
          value={cost}
        />
        <Button variant='outlined' type='submit' sx={{ color: 'black' }}>
          Create Activity
        </Button>
      </form>
    </StyledCreate>
  );
};

export default CreateTask;

const StyledCreate = styled.div`
  position: absolute;
  height: calc(100vh - 80px);
  width: 100%;
  display: grid;
  place-content: center;
  /* border: 2px solid red; */

  form {
    /* border: 2px solid pink; */
    width: 340px;
    height: 480px;
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 48px;
    background-color: #72a0c1;
    color: black;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const StyledDescription = styled.h3`
  font-size: 20px;
`;

const StyledInput = styled.input`
  height: 40px;
`;

const StyledSelect = styled.select`
  height: 30px;
`;
