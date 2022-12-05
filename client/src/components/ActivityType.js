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
    <StyledContainer>
      {!toggleForm ? (
        <StyledActivity key={activity.id}>
          <StyledPlan>
            <StyledBold>Type:</StyledBold> {activity.activity}
          </StyledPlan>
          <StyledPlan>
            <StyledBold>Duration: </StyledBold>
            {activity.duration} hour(s)
          </StyledPlan>
          <StyledPlan>
            <StyledBold> Description: </StyledBold>
            {activity.title}
          </StyledPlan>
          <StyledPlan>
            <StyledBold> Cost: </StyledBold>${activity.cost}
          </StyledPlan>
        </StyledActivity>
      ) : (
        <StyledForm onSubmit={updateActivity}>
          <StyledActivity>
            <h3>Select your Card Type:</h3>
            <StyledSelect
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
            </StyledSelect>
            <h3>Description:</h3>
            <StyledInput
              type='text'
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder='Details of your activity'
              value={formData.title}
            />
            <h3>Duration:</h3>
            <StyledInput
              type='number'
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder='The estimated duration'
              value={formData.duration}
            />
            <h3>Cost:</h3>
            <StyledInput
              type='number'
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              placeholder='Please enter the cost'
              value={formData.cost}
            />
          </StyledActivity>
          <StyledBtnContainer>
            <StyledBtn
              onClick={() => {
                setToggleForm(!toggleForm);
              }}
            >
              Edit
            </StyledBtn>
            <StyledBtn type='submit'>Save</StyledBtn>
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
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-top: 10px;
  /* border: 5px solid orange; */
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`;

const StyledActivity = styled.div`
  /* margin-top: 10px; */
  /* border: 2px solid red; */
  width: 100%;
  padding-left: 10px;
  padding-bottom: 10px;
  line-height: 1.5em;
`;

const StyledBold = styled.span`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
`;

const StyledBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  padding: 3px;
  border: 0.2em solid #d6ccc2;
  border-radius: 50%;
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  text-align: center;
  transition: all 0.2s;
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
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledForm = styled.form`
  margin-top: 10px;
  margin-left: 10px;
  /* border: 2px solid blue; */
  display: flex;
  width: 100%;
  gap: 16px;

  /* flex-direction: column; */
`;

const StyledEditBtnContainer = styled.div``;

const StyledInput = styled.input`
  height: 30px;
  width: 100%;
`;

const StyledSelect = styled.select`
  height: 30px;
  width: 100%;
`;
const StyledPlan = styled.div`
  font-size: 20px;
  letter-spacing: 1px;
`;
export default ActivityType;
