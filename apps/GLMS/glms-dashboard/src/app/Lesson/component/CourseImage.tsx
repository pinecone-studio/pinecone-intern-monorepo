import { Section } from "@/generated/index"


const CourseImage = ({contentImage}:Section) => {

  return (
<img data-testid="course-image-test-id" width="306px" height="209px" style={{ borderRadius: '12px', border: '1px' }} src={`${contentImage}`} />
  )
}

export default CourseImage
