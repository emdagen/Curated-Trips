import { useState, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import styled from 'styled-components';
import ActivityType from './ActivityType';
import AddComment from './AddComment';

const Day = ({ day, index, commentsArray }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const { commentsObj, setCommentsObj } = useContext(StateContext);

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
      // if (json.status === 404) {
      //   setLoadingObj({ ...loadingObj, board: 'checked' });
      // } else {
      //   setLoadingObj({ ...loadingObj, board: 'verify' });
      // }
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
              <div>
                <p>Entry #{index + 1}</p>
                <p>{comment.comment}</p>
                <button
                  onClick={() => {
                    handleRemove(comment);
                  }}
                >
                  Delete
                </button>
              </div>
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
  /* border: 2px solid green; */
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const StyledActivity = styled.div`
  padding-bottom: 15px;
  /* border: 2px solid red; */
  padding-left: 10px;
`;
const StyledTop = styled.div`
  /* border: 2px solid turquoise; */
`;
const StyledBold = styled.span`
  font-weight: bold;
`;