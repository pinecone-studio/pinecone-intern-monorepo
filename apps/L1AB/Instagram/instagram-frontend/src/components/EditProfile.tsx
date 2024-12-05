'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '@/generated';
import { useEffect, useState } from 'react';

interface UserInfoProps {
  __typename?: 'User';
  _id: string;
  username: string;
  profilePicture: string;
  fullname: string;
  gender: string;
  bio: string;
}

export const EditProfile = ({ user }: { user: UserInfoProps }) => {
  const [updateUser] = useUpdateUserMutation();
  const [updateData, setUpdateData] = useState({
    username: '',
    gender: '',
    profilePicture: '',
    bio: '',
    fullname: '',
  });
  useEffect(() => {
    setUpdateData({
      username: user?.username,
      gender: user?.gender,
      profilePicture: user?.profilePicture,
      bio: user?.bio,
      fullname: user?.fullname,
    });
  }, [user]);
  const handleUpdateUser = async () => {
    try {
      const response = await updateUser({
        variables: {
          id: user._id,
          input: {
            username: updateData.username,
            gender: updateData.gender,
            profilePicture: updateData.profilePicture,
            bio: updateData.bio,
            fullname: updateData.fullname,
          },
        },
      });
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col pt-16">
      <div className="w-[600px] h-fit flex flex-col">
        <p className="font-semibold text-3xl text-[#09090B] font-sans">Edit Profile</p>
        <div className="pt-11 ">
          <div className="flex">
            <Avatar>
              <AvatarImage src={updateData.profilePicture || 'https://github.com/shadcn.png'} />
              <AvatarFallback>{updateData.username}</AvatarFallback>
            </Avatar>
            <div className="flex justify-between w-full pl-3 items-center">
              <div className="flex items-center gap-3">
                <p className="text-base flex font-normal  text-[#262626] font-sans">{user?.username}</p>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Профайл зураг солих" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upload New Photo">Шинэ зураг оруулах</SelectItem>
                    <SelectItem value="Remove Current Photo">Одоогийн зургаа устгах</SelectItem>
                    <SelectItem value="Cancel">Цуцлах</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <p className="text-[#262626] text-base font-semibold font-sans">Name</p>
            <Input className="mt-2 font-sans text-sm" placeholder="Name" value={updateData.fullname} onChange={(e) => setUpdateData({ ...updateData, fullname: e.target.value })} />
          </div>
          <div className="pt-3 text-xs text-[#8E8E8E] font-[inter] font-normal">
            <p>Help people discover your account by using the name youre known by: either your full name, nickname, or business name.</p>
            <p className="pt-3">You can only change your name twice within 14 days.</p>
          </div>

          <div className="pt-5">
            <p className="text-[#262626] text-base font-semibold font-sans">UserName</p>
            <Input className="mt-2 font-sans" placeholder="UserName" value={updateData.username} onChange={(e) => setUpdateData({ ...updateData, username: e.target.value })} />
          </div>

          <div className="pt-5">
            <p className="text-[#262626] text-base font-semibold font-sans">Bio</p>
            <Textarea className="mt-2 font-sans h-28 text-sm" placeholder="Bio" value={updateData.bio} onChange={(e) => setUpdateData({ ...updateData, bio: e.target.value })} data-testid="Bio" />
            <div className="flex justify-end text-[#8E8E8E] font-normal font-sans text-xs">{updateData.bio?.length || 0}/150</div>
          </div>

          <div className="pt-5">
            <p className="text-[#262626] text-base font-semibold font-sans">Gender</p>
            <div className="pt-2 text-sm text-[#18181B] text-[inter]">
              <Select value={updateData.gender} data-testid="selectValue" onValueChange={(value) => setUpdateData({ ...updateData, gender: value })}>
                <SelectTrigger className="w-full " data-testid="combobox">
                  <SelectValue placeholder="Prefer not to say" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female" data-testid="select">
                    Female
                  </SelectItem>
                  <SelectItem value="Male" data-testid="select">
                    Male
                  </SelectItem>
                  <SelectItem value="Prefer not to say" data-testid="select">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex mt-10 justify-end">
            <Button className="bg-[#2563EB] hover:bg-[#2563EB]" onClick={handleUpdateUser} data-testid="updateSumbit">
              Submit
            </Button>
          </div>
          <div className="text-[#71717A] text-xs flex w-full flex-col justify-center pt-11">
            <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
            <p className="flex justify-center pt-4">© 2024 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  );
};
