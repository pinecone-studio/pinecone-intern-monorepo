import { Course } from '@/generated/index'

const CourseTitle = ({title}:Course) => {
  return (
    <p className='text-[32px] font-extrabold' data-testid="course-title-test-id" >
    {title}
  </p>
  )
}

export default CourseTitle
