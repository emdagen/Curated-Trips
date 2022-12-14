import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

// manages card data
const Card = ({ card, index }) => {
  return (
    //Draggable JSX PROVIDED FROM BEAUTIFUL DND
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <StyledDnDCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <StyledCard>
            <StyledP>
              <StyledSpan>Type:</StyledSpan> {card.activity}
            </StyledP>
            <StyledP>
              <StyledSpan>Description:</StyledSpan> {card.title}
            </StyledP>
            <StyledP>
              <StyledSpan>Duration:</StyledSpan> {card.duration} hour(s)
            </StyledP>
            <StyledP>
              <StyledSpan>Cost:</StyledSpan> $ {card.cost}
            </StyledP>
          </StyledCard>
        </StyledDnDCard>
      )}
    </Draggable>
  );
};

const StyledCard = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const StyledDnDCard = styled.div`
  //be careful with styling this div
  border-radius: 10px;
  border: 2px solid white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: ${(props) =>
    props.isDragging ? '#F0F8FF' : 'transparent'};
`;

const StyledSpan = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
const StyledP = styled.p`
  font-size: 20px;
`;
export default Card;
