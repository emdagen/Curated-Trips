import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
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
            cols='65'
            name='comment'
            placeholder='Add your tips & tricks here ...'
          ></textarea>
          <StyledAddComment type='submit'>Post Comment</StyledAddComment>
        </form>
      )}

      <StyledAddComment
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        Add Comment
      </StyledAddComment>

      {commentsArray && commentsArray.length !== 0 && (
        <StyledAddComment
          onClick={() => {
            setToggleShow(!toggleShow);
          }}
        >
          Show Comment(s)
        </StyledAddComment>
      )}
    </div>
  );
};

const StyledAddComment = styled.button`
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
  margin-top: 5px;
  margin-right: 5px;
  width: 120px;
`;

export default AddComment;
