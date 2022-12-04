import { useState, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';

import ActivityType from './ActivityType';
import AddComment from './AddComment';

const Day = ({ day, index, commentsArray }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const { setCommentsObj } = useContext(StateContext);

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
        <StyledNumDay>Travel Plan</StyledNumDay>
      </StyledTop>
      {day &&
        day.map((activity) => {
          // console.log(activity);
          return <ActivityType activity={activity} dayId={day.id} />;
        })}
      {toggleShow && commentsArray && (
        <div>
          {commentsArray.map((comment, index) => {
            console.log(comment);
            return (
              <StyledComment>
                <p>
                  {index + 1}. Posted on: {comment.date}
                </p>
                <p>"{comment.comment}"</p>
                <StyledDeleteBtn
                  onClick={() => {
                    handleRemove(comment);
                  }}
                >
                  Delete
                </StyledDeleteBtn>
              </StyledComment>
            );
          })}
        </div>
      )}
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
  border: 2px solid green;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-height: 200px;
  width: 500px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* background-image: url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80');
  background-repeat: no-repeat;
  background-size: cover; */
  background-color: #c5d5e4;
`;
const StyledNumDay = styled.h3`
  font-size: 25px;
  text-align: center;
`;
// const StyledWidgetContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   /* border: 2px solid orange; */
//   gap: 10px;
// `;

const StyledTop = styled.div`
  border: 2px solid turquoise;
`;

const StyledDeleteBtn = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.2em solid #d6ccc2;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #d6ccc2;
  text-align: center;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

const StyledComment = styled.div`
  background-color: white;
`;
