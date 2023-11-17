import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import toast, { Toaster } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Delete({ desc,onDelete }) {
  const [apiResponse, setapiResponse] = React.useState(null)
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ setOpen(false)
    setapiResponse(null);
  };


  let delettask = async (desc) => {

    const responce = await fetch('http://localhost:8000/delete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ '_id': desc })
    })

    if (responce.ok) {
     
      setapiResponse("task removed from list")
      onDelete(desc);
    }

  }









  return (
    <div>
      <Button title='delete task' onClick={handleOpen}><DeleteOutlineIcon /></Button>
      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          apiResponse ?( <Box sx={style}>
           
            <Typography id="modal-modal-title" variant="h6" component="h2">
            {apiResponse}
            </Typography>

          </Box>
           ) :


           ( <Box sx={style}>
              <Toaster position='top-center' />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                are you sure ?
              </Typography>

              <Button onClick={() => delettask(desc)}>yes</Button><Button onClick={handleClose}>No</Button>
            </Box>
       ) }
      </Modal>
    </div>
  );
}