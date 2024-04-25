import { Section } from '@/generated/index'
import { Typography } from '@mui/material'
import React from 'react'

const CourseTitle = ({title}:Section) => {
  return (
    <Typography fontSize="32px" fontWeight="700">
    
    {title}
  </Typography>
  )
}

export default CourseTitle
