import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BiCommentCheck } from 'react-icons/bi';

const AddComment = ({
  day,
  column,
  toggleShow,
  setToggleShow,
  commentsArray,
}) => {
  const { setCommentsObj } = useContext(StateContext);
  const { _id } = useParams();
  const [toggleForm, setToggleForm] = useState(false);
  const [formData, setFormData] = useState({ tripId: _id, column });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //POST that sends user comments //

    const addComment = async () => {
      try {
        const res = await fetch('/api/add-comment', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-type': 'application/json',
          },
        });
        const json = await res.json();
        console.log(json);
        if (json.status <= 300) {
          setCommentsObj(json.data);
          console.log('comment successful');
        } else {
          console.log('comment failed');
        }
      } catch (err) {
        console.log(err);
      }
    };
    addComment();
  };

  return (
    <div>
      {toggleForm && (
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            rows='5'
            cols='47'
            name='comment'
            placeholder='Add your tips & tricks here ...'
          ></textarea>
          <IconButton size='large' type='submit' color='inherit'>
            <BiCommentCheck />
          </IconButton>
        </form>
      )}
      <Stack spacing={2} direction='row'>
        <Button
          variant='outlined'
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
        >
          Add Comment
        </Button>
        {commentsArray && commentsArray.length !== 0 && (
          <Button
            variant='outlined'
            onClick={() => {
              setToggleShow(!toggleShow);
            }}
          >
            Show Comment(s)
          </Button>
        )}{' '}
      </Stack>
    </div>
  );
};

export default AddComment;
