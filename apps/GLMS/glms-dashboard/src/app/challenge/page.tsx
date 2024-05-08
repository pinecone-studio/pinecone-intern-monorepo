import ProgressBar from './_components/ProgressBar';
import { ChallengeResults } from './_feature/ChallengeResults';
import { Timer } from './_components/Timer';

const ChallengePage = () => {
  return (
    <div className="w-screen overflow-hidden px-[120px] bg-white">
      <h1>Welcome to Challenge page</h1>
      <ProgressBar />
      <ChallengeResults />
      <Timer />
    </div>
  );
};

export default ChallengePage;
