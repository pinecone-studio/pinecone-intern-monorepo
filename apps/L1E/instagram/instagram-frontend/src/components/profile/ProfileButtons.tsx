import { Button } from "@/components/ui/button";

interface Props {
  isMine: boolean;
  isPrivate: boolean;
}

const ProfileButtons = ({ isMine, isPrivate }: Props) => {
  if (isMine) {
    return (
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">Edit Profile</Button>
          <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">Ad tools</Button>
        </div>
        <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">Settings</Button>
      </div>
    );
  }

  if (!isMine && !isPrivate) {
    return (
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button variant="secondary" className="px-[16px] font-medium text-white bg-[#2563EB] hover:bg-[#2563EB]">Follow</Button>
          <Button variant="secondary" className="px-[16px] font-medium hover:bg-[#F4F4F5]">Message</Button>
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
