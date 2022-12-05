import { useState, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';

import ActivityType from './ActivityType';
import AddComment from './AddComment';
import { BiMessageSquareX } from 'react-icons/bi';
import { format, parseISO } from 'date-fns';
import ArchivedActivity from './ArchivedActivity';

const ArchivedDay = ({ day, index, commentsArray }) => {
  const { setCommentsObj } = useContext(StateContext);
  let dateFormatted;

  return (
    <StyledDay key={day.id}>
      <StyledTop>
        <StyledNumDay>Day {index + 1}</StyledNumDay>
        <StyledNumDay>Travel Plan</StyledNumDay>
      </StyledTop>
      {day &&
        day.map((activity) => {
          // console.log(activity);
          return <ArchivedActivity activity={activity} dayId={day.id} />;
        })}
      {commentsArray && (
        <div>
          {commentsArray.map((comment, index) => {
            // console.log(comment);
            const date = comment.date;
            dateFormatted = format(parseISO(date), 'MMM d yyyy');
            return (
              <StyledComment>
                <p>
                  {index + 1}. Posted on: {dateFormatted}
                </p>
                <p>" {comment.comment} "</p>
              </StyledComment>
            );
          })}
        </div>
      )}
    </StyledDay>
  );
};
export default ArchivedDay;

const StyledDay = styled.div`
  border: 2px solid green;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-height: 200px;
  width: 500px;
  display: flex;
  flex-direction: column;
  background-color: #c5d5e4;
`;
const StyledNumDay = styled.h3`
  font-size: 25px;
  text-align: center;
`;

const StyledTop = styled.div`
  border: 2px solid turquoise;
`;

const StyledComment = styled.div`
  background-color: white;
`;
