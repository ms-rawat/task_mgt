import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

function TOSTER({message}) {
    
  return (
    <div>
        <Toaster position='bottom-right'/>
        <h1>{message}</h1>
    </div>
  )
}

export default TOSTER