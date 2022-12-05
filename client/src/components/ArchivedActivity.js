import styled from 'styled-components';

const ArchivedActivity = ({ activity, dayId }) => {
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
};

const StyledActivity = styled.div`
  /* border: 2px solid red; */
  padding-left: 10px;
  gap: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  line-height: 1.5em;
`;

const StyledBold = styled.span`
  font-weight: bold;
`;

const StyledContainer = styled.div`
  /* border: 2px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between; */
`;
export default ArchivedActivity;
