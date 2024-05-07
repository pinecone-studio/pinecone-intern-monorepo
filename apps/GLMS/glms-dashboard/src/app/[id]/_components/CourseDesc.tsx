import { Course } from '@/generated';

const CourseDesc = ({ description }: Course) => {
  return (
    <p className="w-[950px] text-[18px]" data-testid="course-desc-test-id">
      {description}
    </p>
  );
};

export default CourseDesc;
