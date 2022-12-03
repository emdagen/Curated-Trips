import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { StateContext } from '../context/StateContext';

// Updates Mongodb on changes in column
const Board = () => {
  const { boardData, setBoardData, updateDB, setUpdateDB, userData } =
    useContext(StateContext);

  useEffect(() => {
    //updates database
    const updateBoardData = async () => {
      const res = await fetch('/api/update-board', {
        method: 'PATCH',
        body: JSON.stringify({ email: userData.email, ...boardData }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
      setUpdateDB(false);
    };
    updateDB && updateBoardData();
  }, [updateDB]);

  // PROVIDED FROM BEAUTIFUL DND
  // function that runs when you drop the card
  const onDragEnd = (result) => {
    // reorder column
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    //check to see if the position changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //get the original column
    const start = boardData.columns[source.droppableId];
    const finish = boardData.columns[destination.droppableId];
    if (start === finish) {
      //create new array with same content
      const newTasksIds = Array.from(start.taskIds);
      //remove existing item
      newTasksIds.splice(source.index, 1);
      //move item to new position
      newTasksIds.splice(destination.index, 0, draggableId);

      //newColumn
      const newColumn = {
        ...start,
        taskIds: newTasksIds,
      };

      //Create new object
      const newState = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoardData(newState);
      //^^^^    Above provided by Beautiful Dnd Library    ^^^^//
      setUpdateDB(true);
      return;
    }

    //moving from one column to the other
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    //Create new boardDate state
    const newState = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setBoardData(newState);
    //^^^^    Above provided by Beautiful Dnd Library    ^^^^//
    setUpdateDB(true); // UPDATE MONGODB
  };
  console.log(boardData);
  return (
    //JSX PROVIDED FROM BEAUTIFUL DND
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledContainer>
        {boardData.days !== undefined &&
          boardData.columnOrder &&
          boardData.columnOrder.map((columnId) => {
            // Single Column Data
            const column = boardData.columns[columnId];
            //Individual Task Data
            const tasks = column.taskIds.map(
              (taskId) => boardData.tasks[taskId]
            );
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
      </StyledContainer>
    </DragDropContext>
  );
};

export default Board;

const StyledContainer = styled.div`
  display: flex; // PROVIDED FROM BEAUTIFUL DND *Do not remove FLEX*
  gap: 16px;
  height: 100%;
  /* border: 3px solid pink; */
  overflow-x: scroll;
  direction: ltr;
  /* &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none; */
`;
