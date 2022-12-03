import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { StateContext } from '../context/StateContext';
import { Keyframes } from 'styled-components';
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
        <h3>Select your Card Type:</h3>
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value='' disabled>
            Please Select
          </option>
          <option value='Travel'>Travel</option>
          <option value='Hotel'>Hotel</option>
          <option value='Restaurant'>Restaurant</option>
          <option value='Activity'>Activity</option>
        </select>
        <h3>Description:</h3>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Details of your activity'
          value={title}
        />
        <h3>Duration:</h3>
        <input
          type='number'
          onChange={(e) => setDuration(e.target.value)}
          placeholder='The estimated duration'
          value={duration}
        />
        <h3>Cost:</h3>
        <input
          type='number'
          onChange={(e) => setCost(e.target.value)}
          placeholder='Please enter the cost'
          value={cost}
        />
        <SubmitBtn type='submit'>Create Activity</SubmitBtn>
      </form>
    </StyledCreate>
  );
};

export default CreateTask;

const StyledCreate = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  /* border: 1px solid red; */
  display: grid;
  place-content: center;
  form {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 48px;
    background-image: url('https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80');
    /* background-image: url('https://images.unsplash.com/photo-1612690119274-8819a81c13a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'); */
    background-repeat: no-repeat;
    background-size: cover;
    /* background-color: #2774ae; */
    color: #005a9c;
    border-radius: 8%;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;
const SubmitBtn = styled.button`
  text-decoration: none;
  height: 30px;
  border-radius: 10px;
  border: 1px solid rgb(146, 148, 248);
  position: relative;
  overflow: hidden;
  background-color: #005a9c;
  color: white;

  :hover {
    box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4);
  }
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(146, 148, 248, 0.4),
      transparent
    );
    transition: all 650ms;
  }
  :hover:before {
    left: 100%;
  }
`;
