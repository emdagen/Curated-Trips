import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StateContext } from '../context/StateContext';

const UploadWidget = ({ index }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { _id } = useParams();
  const { userData } = useContext(StateContext);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    // console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'curatedtrips',
        uploadPreset: 'lvgcunvw',
        cropping: true, //adds a cropping step
        multiple: true, //Allows user to upload multiple files
        folder: 'user_images', //upload files to the specified folder
        tags: ['users', 'profile'], //add the given tags to the uploaded files
        context: { alt: 'user_uploaded' }, //add the given context data to the uploaded files

        // maxImageWidth: 300, //Scales the image down to a width of 300 pixels before uploading
      },

      function (error, result) {
        if (!error && result && result.event === 'success') {
          // console.log(result);

          const uploadImg = async () => {
            // console.log('hello');
            try {
              const res = await fetch('/api/uploadImage', {
                method: 'POST',
                body: JSON.stringify({
                  image: result.info.url,
                  _id,
                  email: userData.email,
                }),
                headers: {
                  'Content-type': 'application/json',
                },
              });
              const json = await res.json();
              console.log(json);
            } catch (err) {
              console.log(err);
            }
          };
          uploadImg();
        }
      }
    );
  }, [toggle]);

  return (
    <StyledUploadBtn
      onClick={() => {
        widgetRef.current.open();
        setToggle(true);
      }}
    >
      Upload Image
    </StyledUploadBtn>
  );
};

const StyledUploadBtn = styled.button``;
export default UploadWidget;
