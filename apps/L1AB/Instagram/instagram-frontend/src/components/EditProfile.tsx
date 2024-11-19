import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const EditProfile = () => {
  return (
    <div className="flex justify-center items-center flex-col pt-16">
      <div className="w-[600px] h-fit flex flex-col ">
        <p className="font-semibold text-2xl text-[#09090B] font-sans">Edit Profile</p>

        <div className="flex justify-between pt-11 items-center">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="flex items-center">upvox_</p>
          </div>
          <div className="flex">
            <Select>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Change profile photo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Upload New Photo">Upload New Photo</SelectItem>
                <SelectItem value="Remove Current Photo">Remove Current Photo</SelectItem>
                <SelectItem value="Cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[#262626] text-lg font-semibold font-sans ">Name</p>
          <Input className="mt-2" placeholder="Name" />
          <p className="pt-3 text-[#8E8E8E] font-sans font-normal text-xs">Help people discover your account by using the name you`re known by: either your full name, nickname, or business name.</p>
          <p className="pt-3 text-[#8E8E8E] font-normal  font-sans text-xs">You can only change your name twice within 14 days.</p>
        </div>

        <div className="pt-5">
          <p className="text-[#262626] text-lg font-semibold font-sans ">UserName</p>
          <Input className="mt-2" placeholder="UserName" />
        </div>
        <div className="pt-5">
          <p className="text-[#262626] text-lg font-semibold font-sans ">Bio</p>
          <Textarea className="mt-2" placeholder="Placeholder" />
          <div className="flex justify-end text-[#8E8E8E] font-normal  font-sans text-xs ">0/150</div>
        </div>
        <div className="pt-5">
          <p className="text-[#262626] text-lg font-semibold font-sans ">Gender</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Prefer not to say" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button className="flex justify-end mt-10 bg-[#2563EB] hover:bg-[#2563EB]">Submit</Button>
        </div>
      </div>

      <p className=" mt-11 flex pt-3 text-[#71717A] font-sans font-normal text-xs">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
      <p className=" flex pt-4 text-[#71717A] font-sans font-normal text-xs">© 2024 INSTAGRAM FROM META</p>
    </div>
  );
};
