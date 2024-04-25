"use client"
import { TextField } from '@mui/material'
import {  useState } from 'react';

export const Input = () => {
    const [quizeInput, setQuizeInput] = useState("");
    const  onChangeHandler=(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      setQuizeInput(event.target.value)
    }
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
    onChange={ (e)=>onChangeHandler(e)}
    />
</form>
  )
}
