import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const EndAdventure = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  // DELETE that removes trip from CurrentTrip Collection //

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/archive-trip/${_id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      console.log(json);
      navigate(`/archived`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledBtnContainer>
      <Button
        variant='outlined'
        onClick={handleRemove}
        size={'large'}
        // sx={{ border: 'black' }}
      >
        End Adventure
      </Button>

      {/* <StyledEndBtn onClick={handleRemove}>End Adventure</StyledEndBtn> */}

      <StyledNote>*Trip will be saved in Archived</StyledNote>
    </StyledBtnContainer>
  );
};

const StyledBtnContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledNote = styled.p`
  color: black;
  font-size: 15px;
  margin-top: 5px;
`;

export default EndAdventure;
