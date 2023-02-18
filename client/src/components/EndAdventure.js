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

// const StyledEndBtn = styled.button`
//   display: inline-block;
//   padding: 0.35em 1.2em;
//   border: 0.2em solid #d6ccc2;
//   border-radius: 0.12em;
//   box-sizing: border-box;
//   text-decoration: none;
//   color: black;
//   text-align: center;
//   transition: all 0.2s;
//   font-weight: 600;
//   font-size: 20px;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   :hover {
//     color: #d6ccc2;
//     background-color: #ffffff;
//   }
//   margin-top: 5px;
//   margin-right: 5px;
//   width: 200px;
//   height: 80px;
// `;
const StyledBtnContainer = styled.div`
  margin-top: 50px;
  /* border: 2px solid white; */
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
