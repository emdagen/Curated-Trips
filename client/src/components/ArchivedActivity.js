import styled from 'styled-components';

const ArchivedActivity = ({ activity, dayId }) => {
  return (
    <>
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

export default ArchivedActivity;
