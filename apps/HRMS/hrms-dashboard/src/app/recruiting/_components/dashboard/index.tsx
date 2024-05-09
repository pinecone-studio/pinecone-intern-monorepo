import { Button } from '../core';
import { useRouter } from 'next/navigation';

export const JobRecruitDashboard = () => {
  const router = useRouter();
  const addRecruit = () => {
    router.push('/recruiting/add-job');
  };
  return (
    <div>
      <div style={{ paddingInline: '24px', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'black' }}> Ажлын зар</h1>
          <div data-testid="jobAdd-button">
            <Button label="Зар нэмэх" plusIcon onClick={addRecruit} />
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingInline: '23px', height: '56px' }}>
          <p style={{ fontSize: '14px', paddingBlock: '4px', fontWeight: 500 }}>Зар</p>
          <p style={{ fontSize: '14px', paddingBlock: '4px' }}>Ирсэн өргөдөл</p>
        </div>
      </div>
      <div className="border-t-[#ECEDF0] border-t w-full px-12"></div>
      <div style={{ borderTop: '1px solid #303436', width: '100%' }}></div>
    </div>
  );
};
