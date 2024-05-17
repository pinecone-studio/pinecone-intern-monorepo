import { Course } from '@/generated';

const CourseDesc = ({ description }: Course) => {
  return (
    <p className="max-w-[792px] w-full text-base sm:text-base md:text-lg  text-justify" data-testid="course-desc-test-id">
      {description}
    </p>
  );
};

export default CourseDesc;
