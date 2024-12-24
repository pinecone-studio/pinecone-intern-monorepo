'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useUpdateUserMutation } from '@/generated';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
            profilePicture: updateData.profilePicture || 'https://res.cloudinary.com/' + 'dezeem4wu/image/upload/v1733392437/' + 'a04d849cf591c2f980548b' + '982f461401_ii7gn6.jpg',
            bio: updateData.bio,
            fullname: updateData.fullname,
          },
        },
      });
      router.push(`/profile?type=posts&username=${user?.username}`);
      console.log('Update successful:', response);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ig-cloudinary');
    data.append('cloud_name', 'doqzizxvi');
    try {
      setLoading(true);
      const res = await fetch('https://api.cloudinary.com/v1_1/doqzizxvi/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploadedImage = await res.json();
      setUpdateData({ ...updateData, profilePicture: uploadedImage.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageAction = (action: string) => {
    if (action === 'Upload New Photo') {
      document.getElementById('fileInput')?.click();
    } else if (action === 'Remove Current Photo') {
      setUpdateData({ ...updateData, profilePicture: '' });
    }
  };
  return (
    <div className="flex justify-center items-center flex-col pt-16">
      <div className="w-[600px] h-fit flex flex-col">
        <p className="font-semibold text-3xl text-[#0x9090B] font-sans">Edit Profile</p>
        <div className="pt-11">
          <div className="flex items-center">
            <Avatar>
              {loading ? (
                <div className="flex justify-center items-center w-12 h-12 bg-slate-50 rounded-full">
                  <CircularProgress size={24} />
                </div>
              ) : updateData.profilePicture ? (
                <AvatarImage src={updateData.profilePicture} className="object-cover" />
              ) : (
                <AvatarImage src={'https://res.cloudinary.com/' + 'dezeem4wu/image/upload/' + 'v1733392437/a04d849cf5' + '91c2f980548b982f' + '461401_ii7gn6.jpg'} className="object-cover" />
              )}
            </Avatar>
            <input id="fileInput" type="file" className="hidden" onChange={handleUpload} />
            <div className="flex justify-between w-full pl-3 items-center">
              <div className="flex items-center gap-3">
                <p className="text-base flex font-normal text-[#262626] font-sans">{user?.username}</p>
              </div>
              <Select onValueChange={handleImageAction}>
                <SelectTrigger className="w-fit hover:text-[#2563EB]">
                  <SelectValue placeholder="Change profile photo" />
                </SelectTrigger>
                <SelectContent className="text-[#2563EB]">
                  <SelectItem value="Upload New Photo">Upload New Photo</SelectItem>
                  <SelectItem value="Remove Current Photo">Remove Current Photo</SelectItem>
                  <SelectItem value="Cancel">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-[#262626] mt-5 text-base font-semibold font-sans">Name</p>
          <Input className="mt-2 font-sans text-sm" placeholder="Name" value={updateData.fullname} onChange={(e) => setUpdateData({ ...updateData, fullname: e.target.value })} />
          <div className="pt-3 text-xs text-[#8E8E8E] font-[inter]">
            <p>Help people discover your account by using the name you’re known by: either your full name, nickname, or business name.</p>
            <p className="pt-3">You can only change your name twice within 14 days.</p>
          </div>
          <p className="text-[#262626] mt-5 text-base font-semibold font-sans">Username</p>
          <Input className="mt-2 font-sans" placeholder="Username" value={updateData.username} onChange={(e) => setUpdateData({ ...updateData, username: e.target.value })} />
          <p className="text-[#262626] mt-5 text-base font-semibold font-sans">Bio</p>
          <Textarea className="mt-2 font-sans h-28 text-sm" placeholder="Bio" value={updateData.bio} onChange={(e) => setUpdateData({ ...updateData, bio: e.target.value })} />
          <div className="flex justify-end text-[#8E8E8E] font-normal text-xs">{updateData.bio?.length || 0}/150</div>
          <p className="text-[#262626]  mt-5 text-base font-semibold">Gender</p>
          <Select value={updateData.gender} onValueChange={(value) => setUpdateData({ ...updateData, gender: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Prefer not to say" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex mt-10 justify-end">
            <Button className="bg-[#2563EB dark:text-white bg-[#2563EB] hover:bg-[#2563EB]" onClick={handleUpdateUser}>
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
