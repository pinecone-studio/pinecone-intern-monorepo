'use client'
import { useState } from 'react'

export const InputValue = () => {
    const [quizeInput, setQuizeInput] = useState('')
    function onChangeHandler(e:React.ChangeEvent<HTMLInputElement>){
        setQuizeInput(e.target.value)
    }
  return (
    <div>
        <input type="text" value={quizeInput} placeholder="Оруулна уу..." data-testid="search-text-field" onChange={(e)=>onChangeHandler(e)} />
    </div>
  )
}

