import { Button } from '../core';
import { useRouter } from 'next/navigation';

export const JobRecruitDashboard = () => {
  const router = useRouter();
  const addRecruit = () => {
    router.push('/recruiting/add-job');
  };
  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <div className="text-2xl tracking-tight font-bold text-[#121316]">Ажлын зар</div>
        <div data-testid="jobAdd-button" className="pt-4">
          <Button label="Зар нэмэх" plusIcon onClick={addRecruit} />
        </div>
      </div>
    </div>
  );
};
