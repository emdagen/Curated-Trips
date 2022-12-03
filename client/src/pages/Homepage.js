import styled from 'styled-components';
import CreateForm from '../components/CreateForm';
import UserAccount from '../components/UserAccount';
import BeautifulDnD from '../beautifulDnd/BeautifulDnD';
import { useEffect, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import SwiperSlides from '../components/SwiperSlide';

const Homepage = () => {
  const {
    boardData,
    setBoardData,
    formData,
    userData,
    setLoadingObj,
    loadingObj,
  } = useContext(StateContext);

  useEffect(() => {
    const createBoardData = async () => {
      try {
        const res = await fetch('/api/create-board', {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            email: userData.email,
            // completed: false,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const json = await res.json();
        console.log(json);
        setBoardData(json.data);
        if (json.status === 404) {
          setLoadingObj({ ...loadingObj, board: 'checked' });
        } else {
          setLoadingObj({ ...loadingObj, board: 'verify' });
        }
      } catch (err) {
        console.log(err);
      }
    };
    createBoardData();
  }, [formData]);
  //come back for me

  return (
    <StyledContainer>
      <StyledMain>
        {loadingObj.board != 'loading' && boardData ? (
          <BeautifulDnD />
        ) : (
          loadingObj.board === 'checked' && (
            <StyledHome>
              <SwiperSlides /> <CreateForm />
            </StyledHome>
          )
        )}
      </StyledMain>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 10px;
  min-height: calc(100vh - 50px);
  min-width: 100%;
  overflow: hidden;
  direction: ltr;
  display: flex;
  justify-content: flex-start;
  background-color: #72a0c1;
`;
const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  min-height: 100%;
  border: 3px solid orange;
`;
const StyledHome = styled.div``;
export default Homepage;
