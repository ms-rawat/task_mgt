import WarningIcon from '@mui/icons-material/Warning';
import '../App.css';
import BasicModal from './BasicModal';
import { Button, ButtonGroup } from '@mui/material';
import Delete from './Delete';
import EditTask from '../EditTask';
const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
console.log(formattedDate);

function Task({ tasks,onDelete,onUpdate }) {
  let date1 = new Date(formattedDate);
  let date2 = new Date(tasks.DueDate)

  

  return (
    <div className='task_card' key={tasks._id} >
      <div className='taskId'><h4>{tasks.TaskID}</h4></div>


      {
        (date1.getTime() > date2.getTime()) ? <div title="task is due " className='Icon'><WarningIcon /></div> : <p></p>


      }
      <div className='date'><h5> Due Date - {tasks.DueDate}</h5></div>

      <div className='buttons'>
        <ButtonGroup variant='outlined' size='small'>
         <EditTask task={tasks} onUpdate={onUpdate} />

          <Delete desc={tasks._id} onDelete={onDelete}  />
        </ButtonGroup>
      </div>

      <div title={tasks.TaskDescription} className='desc'><BasicModal desc={tasks.TaskDescription} /></div>
    </div>
  );
}

export default Task;
