import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { StateContext } from '../context/StateContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UploadWidget from '../components/UploadWidget';
import { Cloudinary } from '@cloudinary/url-gen';
import Day from '../components/Day';
import EndAdventure from '../components/EndAdventure';

const ArchivedDetails = () => {
  const { pastTrip } = useContext(StateContext);
  const [archivedDetail, setArchivedDetail] = useState(null);
  console.log(archivedDetail);
  const { _id } = useParams();
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: 'curatedtrips',
  //   },
  // });
  useEffect(() => {
    const getArchivedTrip = async () => {
      const res = await fetch(`/api/archived-trip/${_id}`);
      const json = await res.json();
      console.log(json);
      setArchivedDetail(json.data);
    };
    getArchivedTrip();
  }, [_id]);
  return <div>hi</div>;
};

export default ArchivedDetails;
