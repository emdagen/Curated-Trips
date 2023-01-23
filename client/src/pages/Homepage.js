import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import SwiperSlides from '../components/SwiperSlide';
import CreateForm from '../components/CreateForm';
import BeautifulDnD from '../beautifulDnd/BeautifulDnD';

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
          }),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const json = await res.json();
        // console.log(json);
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

  return (
    <StyledContainer>
      <StyledMain>
        {loadingObj.board != 'loading' && boardData ? (
          <BeautifulDnD />
        ) : (
          loadingObj.board === 'checked' && (
            <StyledHome>
              <CreateForm />
            </StyledHome>
          )
        )}
      </StyledMain>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 10px;
  min-height: calc(100vh - 68.5px);
  min-width: 100%;
  overflow: hidden;
  direction: ltr;
  display: flex;
  justify-content: flex-start;
  background-image: url('https://images.unsplash.com/photo-1635425291944-e70310e8510b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE4fHxzdHJlZXQlMjBwaG90b2dyYXBoeXxlbnwwfDB8MHxibGFja19hbmRfd2hpdGV8&auto=format&fit=crop&w=500&q=60');
  /* background-size: cover; */
  /* background-position: center; */
  /* overflow: hidden; */
`;
const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  min-height: 100%;
  /* border: 3px solid orange; */
`;
const StyledHome = styled.div`
  /* display: flex; */
`;
export default Homepage;
