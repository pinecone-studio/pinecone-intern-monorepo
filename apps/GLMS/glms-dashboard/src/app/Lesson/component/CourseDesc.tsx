import { Section } from "@/generated/index"
import { Typography } from "@mui/material"


const CourseDesc = ({description}:Section) => {
  return (
    <Typography data-testid="course-desc-test-id" sx={{width:'950px', fontSize:'18px'}} >{description}</Typography>
   
  )
}

export default CourseDesc
