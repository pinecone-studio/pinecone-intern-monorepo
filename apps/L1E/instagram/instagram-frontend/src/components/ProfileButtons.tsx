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
          <Button>Edit Profile</Button>
          <Button>Ad tools</Button>
        </div>
        <Button>Settings</Button>
      </div>
    );
  }

  if (!isMine && !isPrivate) {
    return (
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Button>Follow</Button>
          <Button>Message</Button>
        </div>
        <Button>...</Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button>Request</Button>
      <Button>...</Button>
    </div>
  );
};

export default ProfileButtons;
