import styled from 'styled-components';
import { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';

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

  return (
    <StyledContainer>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        <h2>Start New Adventures</h2>
        <StepOne>Step 1</StepOne>
        <h3>Give your trip a name:</h3>
        <Input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Name of Adventure'
          value={title}
        />
        <h3>Number of Days :</h3>
        <Input
          type='number'
          onChange={(e) => setDuration(e.target.value)}
          placeholder='Duration of Stay'
          value={duration}
        />

        <Submit type='submit'>Create New Trip</Submit>
      </StyledForm>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  border: 2px solid orange;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #72a0c1;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 80px;
  background-image: url('https://images.unsplash.com/photo-1514162005038-8332a12a5c9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80');
  background-repeat: no-repeat;
  background-size: cover;
`;
const Input = styled.input`
  height: 30px;
  border-radius: 10px;
`;
const StepOne = styled.h3`
  text-align: center;
`;
const Submit = styled.button`
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
export default CreateForm;
