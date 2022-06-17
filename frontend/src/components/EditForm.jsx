import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGoal } from '../features/goals/goalSlice';

function EditForm({ goal }) {
    const [text, setText] = useState(goal.text);

    const dispatch = useDispatch();

    const onSubmit = e => {
      e.preventDefault();

      const goalData = {
        text,
        id: goal._id
      };

      dispatch(updateGoal(goalData));
    };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input 
            type='text' 
            name='goal' 
            value={text} 
            onChange={e => setText(e.target.value)} 
          />
          <button 
            className='btn btn-reverse btn-block' 
            type='submit'>Update Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditForm;