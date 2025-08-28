'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateUserMutation } from '@/generated';
import { passwordSchema, phoneSchema } from '@/utils/UpdateUserUtils';
import { emailSchema } from '../../../utils/UpdateUserUtils';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { EditPhoneDialog } from './EditPhoneDialog';
import { EditEmailDialog } from './EditEmailDialog';
import { EditPasswordDialog } from './EditPasswordDialog';

interface UpdateUserProfileProps {
  userId: string;
}

export const UpdateUserProfile = ({ userId }: UpdateUserProfileProps) => {
  const [updateUser] = useUpdateUserMutation();

  const handleProfilePictureUpdate = async (imageUrl: string) => {
    try {
      const { data } = await updateUser({
        variables: {
          userId: userId,
          input: { profile: imageUrl },
        },
      });
    } catch (error) {
      console.log(error);
      return { error: 'Профайл зураг шинэчлэхэд алдаа гарлаа' };
    }
  };

  const handlePhoneUpdate = async (phone: string) => {
    try {
      const { data } = await updateUser({
        variables: {
          userId: userId,
          input: { phoneNumber: phone },
        },
      });
    } catch (error) {
      console.log(error);
      return { error: 'Утас шинэчлэхэд алдаа гарлаа' };
    }
  };
  const handleEmailUpdate = async (email: string) => {
    try {
      const { data } = await updateUser({
        variables: { userId: userId, input: { email: email } },
      });
    } catch (error) {
      console.log(error);
      return { error: 'Имэйл шинэчлэхэд алдаа гарлаа' };
    }
  };

  const handlePasswordUpdate = async (currentPassword: string, newPassword: string) => {
    try {
      const { data } = await updatePassword({
        variables: { userId: userId, input: { currentPassword, newPassword } },
      });
    } catch (error) {
      console.log(error);
      return { error: 'Нууц үг шинэчлэхэд алдаа гарлаа.' };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Хэрэглэгчийн хэсэг</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <div className="flex justify-center">
          <ProfilePictureUpload currentImage={user.profile} onImageUpdate={handleProfilePictureUpdate} isLoading={loading} />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {' '}
            <div>
              <p className="text-sm text-gray-500">Утас:</p>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
            <EditPhoneDialog phone={user.phoneNumber} onUpdate={handlePhoneUpdate} isLoading={loading} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Имэйл хаяг:</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <EditEmailDialog currentEmail={user.email} onUpdate={handleEmailUpdate} isLoading={loading} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Нууц үг:</p>
              <p className="font-medium">••••••••••</p>
            </div>
            <EditPasswordDialog onUpdate={handlePasswordUpdate} isLoading={loading} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
