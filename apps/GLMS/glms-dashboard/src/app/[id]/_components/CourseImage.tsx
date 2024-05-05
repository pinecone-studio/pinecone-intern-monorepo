import { Course } from '@/generated';

const CourseImage = ({ thumbnail }: Course) => {
  return <img data-testid="course-image-test-id" width="306px" height="209px" style={{ borderRadius: '12px', border: '1px' }} src={`${thumbnail}`} />;
};

export default CourseImage;
