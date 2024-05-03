import styled from 'styled-components';

const ArchivedActivity = ({ activity, dayId }) => {
  return (
    <StyledContainer>
      <StyledActivity key={activity.id}>
        <StyledRes>
          <StyledBold>Type:</StyledBold> {activity.activity}
        </StyledRes>
        <StyledRes>
          <StyledBold>Duration: </StyledBold>
          {activity.duration} hour(s)
        </StyledRes>
        <StyledRes>
          <StyledBold> Description: </StyledBold>
          {activity.title}
        </StyledRes>
        <StyledRes>
          <StyledBold> Cost: </StyledBold>${activity.cost}
        </StyledRes>
      </StyledActivity>
    </StyledContainer>
  );
};

const StyledActivity = styled.div`
  padding-left: 10px;
  gap: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
  line-height: 1.5em;
`;

const StyledBold = styled.span`
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
`;

const StyledContainer = styled.div``;

const StyledRes = styled.div`
  font-size: 20px;
  letter-spacing: 1px;
`;
export default ArchivedActivity;
