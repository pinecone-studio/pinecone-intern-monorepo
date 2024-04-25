'use client';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  const handleProfilePageButton = () => {
    router.push('/profile');
  };

  const handleAssessmentPageButton = () => {
    router.push('/assessment');
  };
  const lesson = () => {
    router.push('/lesson-add');
  };
<<<<<<< HEAD
=======

  const fileManagementLib = fileManagement();

  console.log(fileManagementLib);
>>>>>>> e7f573c9dff2e3d17e3960063e72c3e45772a755

  return (
    <div>
      <h1>hello from GLMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleProfilePageButton}>Go to profile page</button>
      <button onClick={handleAssessmentPageButton}>Go to assessment page</button>
      <button onClick={lesson}>Lesson</button>
    </div>
  );
};
export default Home;
