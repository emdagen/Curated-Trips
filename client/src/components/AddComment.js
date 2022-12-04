import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StateContext } from '../context/StateContext';
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
            rows='4'
            cols='50'
            name='comment'
            placeholder='Enter text here...'
          ></textarea>
          <button type='submit'>Post Comment</button>
        </form>
      )}

      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        Add Comment
      </button>

      {commentsArray && commentsArray.length !== 0 && (
        <button
          onClick={() => {
            setToggleShow(!toggleShow);
          }}
        >
          Show Comment
        </button>
      )}
    </div>
  );
};
export default AddComment;
