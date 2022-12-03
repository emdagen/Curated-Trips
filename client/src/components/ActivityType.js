import styled from 'styled-components';
import { useContext, useState } from 'react';
import { StateContext } from '../context/StateContext';
import { useParams } from 'react-router';

const ActivityType = ({ activity, dayId }) => {
  const [formData, setFormData] = useState(activity);
  const [toggleForm, setToggleForm] = useState(false);
  const { userData, tripDetails, setTripDetails } = useContext(StateContext);
  const { _id } = useParams();

  // console.log(activity);
  const updateActivity = async (e) => {
    e.preventDefault();
    console.log(formData);
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
        setTripDetails(json.data);
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
          {/* <textarea
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows='4'
            cols='50'
            name='comment'
          >
            {' '}
            Enter text here...
          </textarea> */}

          <StyledBtnContainer>
            <StyledBtn type='submit'>Save Changes</StyledBtn>
          </StyledBtnContainer>
        </StyledForm>
      )}
      {/* //Moved this here from top // */}
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
  /* border: 2px solid red; */
  padding-left: 10px;
`;

const StyledBold = styled.span`
  font-weight: bold;
`;
const StyledBtn = styled.button`
  width: 100px;
  margin-bottom: 10px;
`;
const StyledBtnContainer = styled.div`
  /* border: 2px solid pink; */
  /* display: flex;
  justify-content: center; */
  /* margin-left: 10px; */
  margin-top: 10px;
`;
const StyledForm = styled.form`
  margin-top: 10px;
  margin-left: 10px;
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;
const StyledEditBtnContainer = styled.div`
  margin-left: 10px;
`;

export default ActivityType;
