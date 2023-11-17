import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  marginTop: '16px',
};

export default function EditTask({ task,onUpdate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => 
  {setOpen(false)
  setResponse(null)
  };
  const [Response, setResponse] = React.useState(null)

  let UpdateTask = async (values) => {
    try {
       const response = await fetch('http://localhost:8000/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
       });
 
       if (response.ok) {
          setResponse("updated successfully");
          onUpdate()
       } else {
          setResponse("some error occurred");
       }
    } catch (error) {
       console.error('Error updating task:', error);
       setResponse("some error occurred");
    }
 };
 

  const formik = useFormik({
    initialValues: {
      _id:task._id,
      heading: task.TaskID,
      dueDate: task.DueDate,
      desc: task.TaskDescription,
    },
    onSubmit: (values) => {
     
      UpdateTask(values)
       
    },
  });

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {Response?(
             <Typography id="modal-modal-title" variant="h6" component="h2">
             {Response}
             </Typography>
           ):
           (
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Typography variant="h6" component="h2">
                  Edit task
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="heading"
                  label="Heading"
                  name="heading"
                  type="text"
                  value={formik.values.heading}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  id="dueDate"
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  id="desc"
                  label="Description"
                  name="desc"
                  type="text"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item sx={buttonStyle}>
                <Button variant="contained" color="primary" type="submit">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
           )
           }
          
        </Box>
      </Modal>
    </div>
  );
}
