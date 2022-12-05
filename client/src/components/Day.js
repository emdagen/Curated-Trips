import { useState, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';

import ActivityType from './ActivityType';
import AddComment from './AddComment';
import { BiMessageSquareX } from 'react-icons/bi';
import { format, parseISO } from 'date-fns';

const Day = ({ day, index, commentsArray }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const { setCommentsObj } = useContext(StateContext);
  let dateFormatted;

  // PATCH to remove comment from Day Card in Trip Details //
  const handleRemove = async (comment) => {
    try {
      const res = await fetch('/api/remove-comment', {
        method: 'PATCH',
        body: JSON.stringify(comment),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
      setCommentsObj(json.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledDay key={day.id}>
      <StyledTop>
        <StyledNumDay>Day {index + 1}</StyledNumDay>
        <StyledPlan>Travel Plan</StyledPlan>
      </StyledTop>
      <div>
        {day &&
          day.map((activity) => {
            // console.log(activity);
            return <ActivityType activity={activity} dayId={day.id} />;
          })}

        {toggleShow && commentsArray && (
          <div>
            {commentsArray.map((comment, index) => {
              // console.log(comment);
              const date = comment.date;
              dateFormatted = format(parseISO(date), 'MMM d yyyy');
              return (
                <StyledComment>
                  <StyledDate>
                    {index + 1}. <StyledSpan>Posted on:</StyledSpan>{' '}
                    {dateFormatted}
                  </StyledDate>
                  <p>" {comment.comment} "</p>
                  <BiMessageSquareX
                    onClick={() => {
                      handleRemove(comment);
                    }}
                    size={25}
                  />
                </StyledComment>
              );
            })}
          </div>
        )}
      </div>
      <AddComment
        day={day}
        column={index}
        toggleShow={toggleShow}
        setToggleShow={setToggleShow}
        commentsArray={commentsArray}
      />
    </StyledDay>
  );
};
export default Day;

const StyledDay = styled.div`
  /* border: 2px solid green; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-height: 200px;
  height: 100%;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #c5d5e4;
  padding: 16px;
`;

const StyledNumDay = styled.h3`
  font-size: 25px;
  text-align: center;
`;

const StyledTop = styled.div`
  /* border: 2px solid turquoise; */
`;

const StyledComment = styled.div`
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const StyledPlan = styled.h3`
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 20px;
  padding-bottom: 10px;
`;
const StyledActivity = styled.div`
  /* border: 5px solid orange; */
`;
const StyledDate = styled.p`
  font-size: 15px;
`;
const StyledSpan = styled.span`
  font-weight: 600;
`;
