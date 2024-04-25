"use client"

import { TextField } from '@mui/material'
import React from 'react'

export const Input = () => {
    const [quizeInput, setQuizeInput] = React.useState("");
    
  return (
    <form  noValidate autoComplete='off' >
    <TextField sx={{
        height:"fit",
        marginBottom:"2px",
        padding:"1px",
        borderRadius:"50px",
        backgroundColor:"white"
    }}
    value={quizeInput}
    data-testid='search-text-field'
    aria-label="inputQuize"
    placeholder='Оруулна уу...'
    fullWidth
    onChange={(e)=>setQuizeInput(e.target.value)}
    />
</form>
  )
}
