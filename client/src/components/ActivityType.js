import styled from 'styled-components';
import { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';
import { useParams } from 'react-router';

import AddComment from './AddComment';

const ActivityType = ({ activity, dayId }) => {
  const [formData, setFormData] = useState(activity);
  const [toggleForm, setToggleForm] = useState(false);
  const { userData, tripDetails, setTripDetails, setDayDetails } =
    useContext(StateContext);

  const { _id } = useParams();

  // PATCH that allows user to edit activities in existing trip //
  const updateActivity = async (e) => {
    e.preventDefault();
    console.log(activity);
    try {
      const res = await fetch('/api/update-activity', {
        method: 'PATCH',
        body: JSON.stringify({
          id: activity.id,
          tripId: _id,
          ...formData,
          dayId,
          email: userData.email,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await res.json();
      console.log(json);
      if (json.status <= 300) {
        setDayDetails(json.data.arrayOfDays);
        console.log('update successful');
      } else {
        console.log('update failed');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!toggleForm ? (
        <StyledActivity key={activity.id}>
          <div>
            <StyledBold>Type:</StyledBold> {activity.activity}
          </div>
          <div>
            <StyledBold>Duration: </StyledBold>
            {activity.duration} hour(s)
          </div>
          <div>
            <StyledBold> Description: </StyledBold>
            {activity.title}
          </div>
          <div>
            <StyledBold> Cost: </StyledBold>${activity.cost}
          </div>
        </StyledActivity>
      ) : (
        <StyledForm onSubmit={updateActivity}>
          <h3>Select your Card Type:</h3>
          <select
            value={formData.activity}
            onChange={(e) =>
              setFormData({ ...formData, activity: e.target.value })
            }
          >
            <option value='' disabled>
              Please Select
            </option>
            <option value='Travel'>Travel</option>
            <option value='Hotel'>Hotel</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Activity'>Activity</option>
          </select>
          <h3>Description:</h3>
          <input
            type='text'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder='Details of your activity'
            value={formData.title}
          />
          <h3>Duration:</h3>
          <input
            type='number'
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            placeholder='The estimated duration'
            value={formData.duration}
          />
          <h3>Cost:</h3>
          <input
            type='number'
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            placeholder='Please enter the cost'
            value={formData.cost}
          />

          <StyledBtnContainer>
            <StyledBtn type='submit'>Save Change</StyledBtn>
            <StyledBtn
              onClick={() => {
                setToggleForm(!toggleForm);
              }}
            >
              Edit
            </StyledBtn>
          </StyledBtnContainer>
        </StyledForm>
      )}

      {!toggleForm && (
        <StyledEditBtnContainer>
          <StyledBtn
            onClick={() => {
              setToggleForm(!toggleForm);
            }}
          >
            Edit
          </StyledBtn>
        </StyledEditBtnContainer>
      )}
    </>
  );
};

const StyledActivity = styled.div`
  /* padding-bottom: 15px; */
  border: 2px solid red;
  padding-left: 10px;
`;

const StyledBold = styled.span`
  font-weight: bold;
`;

const StyledBtn = styled.button`
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
  margin-right: 5px;
  margin-bottom: 5px;
`;

const StyledBtnContainer = styled.div`
  border: 2px solid pink;
  /* display: flex;
  justify-content: center; */
  /* margin-left: 10px; */
  margin-top: 10px;
`;
const StyledForm = styled.form`
  margin-top: 10px;
  margin-left: 10px;
  border: 2px solid blue;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;
const StyledEditBtnContainer = styled.div`
  /* border: 2px solid orange; */
  /* padding-left: 10px; */
  /* margin-bottom: 5px; */
`;

export default ActivityType;
