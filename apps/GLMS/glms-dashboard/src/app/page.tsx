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

<<<<<<< Updated upstream
=======
  const fileManagementLib = fileManagement();

>>>>>>> Stashed changes
  return (
    <div>
      <h1>hello from GLMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleProfilePageButton}>Go to profile page</button>
      <button onClick={handleAssessmentPageButton}>Go to assessment page</button>
    </div>
  );
};
export default Home;
