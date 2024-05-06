import ProgressBar from './_components/ProgressBar';
import { ChallengeResults } from './_feature/ChallengeResults';

const ChallengePage = () => {
  return (
    <div className="w-screen overflow-hidden px-[120px] bg-white">
      <h1>Welcome to Challenge page</h1>
      <ProgressBar />
      <ChallengeResults />
    </div>
  );
};

export default ChallengePage;
