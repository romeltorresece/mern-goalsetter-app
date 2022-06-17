import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';
import EditForm from './EditForm';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function GoalItem({ goal }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short'})}
        </div>
        {showEditForm ? (
          <EditForm goal={goal} />
        ) : (
          <h2>{goal.text}</h2>
        )}

        <Tooltip title="Delete" placement='bottom'>
          <IconButton className='close' onClick={() => dispatch(deleteGoal(goal._id))}>
            <DeleteOutlinedIcon fontSize='small'/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" placement='bottom'>
          <IconButton className='edit' onClick={() => setShowEditForm(!showEditForm)}>
            <EditOutlinedIcon fontSize='small'/>
          </IconButton>
        </Tooltip>
    </div>
  );
}

export default GoalItem;