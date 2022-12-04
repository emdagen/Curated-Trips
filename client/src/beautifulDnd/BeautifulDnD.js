import styled from 'styled-components';
import { useContext, useState } from 'react';
import Board from './Board';
import CreateTask from './CreateTask';
import { StateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';

const BeautifulDnD = () => {
  //displays the create card form
  const [toggleForm, setToggleForm] = useState(false);

  const {
    boardData,
    setBoardData,
    formData,
    setFormData,
    userData,
    loadingObj,
    setLoadingObj,
  } = useContext(StateContext);

  const navigate = useNavigate();

  //when user clicks on Done
  const handleComplete = async () => {
    const mapBoardData = (boardObj) => {
      const mappedData = boardObj.columnOrder.map((columnId, index) => {
        //columnId
        const column = boardObj.columns[columnId];
        //array of task objects
        const tasks = column.taskIds.map((taskId) => boardObj.tasks[taskId]);
        return tasks;
      });
      return mappedData.slice(1);
    };
    const completeBoard = async () => {
      const res = await fetch('/api/complete-board', {
        method: 'PATCH',
        body: JSON.stringify({
          email: boardData.email,
          _id: boardData._id,
          // arrayOfDays,
          completed: true,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
      setFormData(null);
      setBoardData(null);
      setLoadingObj({ ...loadingObj, board: 'checked' });
      navigate('/current');
    };
    const arrayOfDays = mapBoardData(boardData);
    await completeBoard();
  };

  return (
    <StyledBeautifulDnD>
      {toggleForm && <CreateTask />}

      <Board />
      <StyledButtons>
        <StyledButton onClick={() => setToggleForm(!toggleForm)}>
          ADD
        </StyledButton>

        <StyledButton onClick={handleComplete}>DONE</StyledButton>
      </StyledButtons>
    </StyledBeautifulDnD>
  );
};
const StyledBeautifulDnD = styled.div`
  height: 100%;
`;

const StyledButton = styled.button`
  height: 70px;
  width: 70px;
  border: none;
  display: grid;
  place-content: center;
  /* background-color: #547aa5; */
  color: white;
  border-radius: 50%;
  background: linear-gradient(45deg, #587998, #4a6680);
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 16px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
export default BeautifulDnD;
