import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { StateContext } from '../context/StateContext';

const UploadWidget = ({ index }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { _id } = useParams();
  const { userData, setImageArray } = useContext(StateContext);
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
          //POST that sends img url/data to backend
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
              setImageArray(json.data);
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

const StyledUploadBtn = styled.button`
  display: inline-block;
  padding: 0.35em 1.2em;
  border: 0.2em solid #d6ccc2;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  color: #d6ccc2;
  text-align: center;
  transition: all 0.2s;
  font-weight: 600;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  :hover {
    color: #000000;
    background-color: #ffffff;
  }
  width: 100px;
  height: 60px;
`;
export default UploadWidget;
