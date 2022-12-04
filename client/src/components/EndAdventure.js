import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const EndAdventure = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/archive-trip/${_id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      console.log(json);
      navigate(`/archived`);
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
    <StyledBtnContainer>
      <StyledEndBtn onClick={handleRemove}>End Adventure</StyledEndBtn>

      <StyledNote>*Trip will be saved in Archived</StyledNote>
    </StyledBtnContainer>
  );
};

const StyledEndBtn = styled.button`
  width: 200px;
  height: 70px;
  border-radius: 10px;
  font-size: 20px;
`;
const StyledBtnContainer = styled.div`
  margin-top: 50px;
  /* border: 2px solid white; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledNote = styled.p`
  color: white;
  font-size: 15px;
`;

export default EndAdventure;
