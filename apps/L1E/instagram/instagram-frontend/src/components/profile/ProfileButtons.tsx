import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isMine: boolean;
  isPrivate: boolean;
}

const ProfileButtons = ({ isMine, isPrivate }: Props) => {
  if (isMine) {
    return (
      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Link href="/edit-profile">
            <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">
              Edit Profile
            </Button>
          </Link>
          <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">
            Ad tools
          </Button>
        </div>
        <Settings strokeWidth={1} />
      </div>
    );
  }

  if (!isMine && !isPrivate) {
    return (
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button variant="secondary" className="px-[16px] font-medium text-white bg-[#2563EB] hover:bg-[#2563EB]">
            Follow
          </Button>
          <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">
            Message
          </Button>
        </div>
        <div>。。。</div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button className="px-[16px] font-medium bg-[#2563EB] hover:bg-[#2563EB]">Request</Button>
      <div> 。。。</div>
    </div>
  );
};

export default ProfileButtons;
