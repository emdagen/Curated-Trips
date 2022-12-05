import { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
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
          <StyledComments>Comments</StyledComments>
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
  /* border: 2px solid green; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #c5d5e4;
`;

const StyledNumDay = styled.h3`
  font-size: 25px;
  text-align: center;
  margin-bottom: 5px;
`;

const StyledTop = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid black;
`;

const StyledComment = styled.div`
  background-color: white;
`;

const StyledComments = styled.p`
  font-size: 20px;
  border-bottom: 2px solid black;
`;
