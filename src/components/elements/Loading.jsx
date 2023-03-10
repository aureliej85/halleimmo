import React from 'react';
import "./loading.scss";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div className='loading'>
        <div>
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="inherit" />
            </Stack>
        </div>
        
    </div>
  )
}

export default Loading