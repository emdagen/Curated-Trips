import styled from 'styled-components';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks }) => {
  //column === column data
  //tasks === card data
  return (
    <StyledContainer>
      <StyledTitle>{column.title}</StyledTitle>
      {/*Droppable JSX PROVIDED FROM BEAUTIFUL DND */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          return (
            //BeautifulDnd function must return jsx
            <StyledCardContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks.map((card, index) => {
                return <Card key={card.id} card={card} index={index} />;
              })}
              {provided.placeholder}
            </StyledCardContainer>
          );
        }}
      </Droppable>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  border: 2px solid white;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 350px;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  background-color: #b9d9eb;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  &:first-child {
    position: sticky;
    left: 0;
  }
`;

const StyledCardContainer = styled.div`
  height: 100%;
  background-color: ${(props) =>
    //isDraggingOver returns true when card is dragging over column
    props.isDraggingOver ? '#72A0C1' : 'transparent'}; //styles COLUMN

  padding: 8px;
  p {
    padding: 8px;
  }
`;

const StyledTitle = styled.h1`
  text-align: center;
  border-bottom: 2px solid black;
`;

export default Column;
