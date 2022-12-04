import { useState, createContext } from 'react';
export const StateContext = createContext(null);

const Provider = ({ children }) => {
  //user context
  const [userData, setUserData] = useState(null);
  // Trip in building state
  const [buildTrip, setBuildTrip] = useState();
  //Present Trip State (when user starts trip)
  const [currentTrips, setCurrentTrips] = useState();
  //Past Trip State (when user has ended the trip)
  const [pastTrip, setPastTrip] = useState();
  // create adventure board
  const [formData, setFormData] = useState(null);
  //toggle to true to update database
  const [updateDB, setUpdateDB] = useState(false);
  //state to manage beautiful DnD data
  const [boardData, setBoardData] = useState(null);
  // loading, checked, verify
  const [loadingObj, setLoadingObj] = useState({
    user: 'loading',
    board: 'loading',
  });
  const [imageArray, setImageArray] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [dayDetails, setDayDetails] = useState(null);
  const [commentsObj, setCommentsObj] = useState(null);
  return (
    <StateContext.Provider
      value={{
        pastTrip,
        setPastTrip,
        userData,
        setUserData,
        buildTrip,
        setBuildTrip,
        formData,
        setFormData,
        updateDB,
        setUpdateDB,
        boardData,
        setBoardData,
        loadingObj,
        setLoadingObj,
        currentTrips,
        setCurrentTrips,
        imageArray,
        setImageArray,
        tripDetails,
        setTripDetails,
        dayDetails,
        setDayDetails,
        commentsObj,
        setCommentsObj,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default Provider;
