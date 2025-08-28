'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateUserMutation } from '@/generated';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { EditPhoneDialog } from './EditPhoneDialog';
import { EditEmailDialog } from './EditEmailDialog';
import { EditPasswordDialog } from './EditPasswordDialog';
import { useAuth } from '@/app/context/AuthContext';

export const UpdateUserProfile = () => {
  const [updateUser] = useUpdateUserMutation();
  const { user, setUser } = useAuth();

  const ensureUserId = () => {
    if (!user?.userId) {
      console.warn('Хэрэглэгч нэвтрээгүй үед засвар хийх боломжгүй!');
      return null;
    }
    return user.userId;
  };

  const handleProfilePictureUpdate = async (imageUrl: string) => {
    const userId = ensureUserId();
    if (!userId) return;

    try {
      const { data } = await updateUser({
        variables: {
          input: { userId, profile: imageUrl },
        },
      });
      if (data?.updateUser) {
        setUser((prev) => ({ ...prev!, profile: data.updateUser.profile }));
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handlePhoneUpdate = async (phone: string) => {
    const userId = ensureUserId();
    if (!userId) return;

    try {
      const { data } = await updateUser({
        variables: {
          input: { userId, phoneNumber: phone },
        },
      });
      if (data?.updateUser) {
        setUser((prev) => ({ ...prev!, phoneNumber: data.updateUser.phoneNumber }));
      }
    } catch (error) {
      console.error('Phone update error:', error);
    }
  };

  const handleEmailUpdate = async (email: string) => {
    const userId = ensureUserId();
    if (!userId) return;

    try {
      const { data } = await updateUser({
        variables: {
          input: { userId, email },
        },
      });
      if (data?.updateUser) {
        setUser((prev) => ({ ...prev!, email: data.updateUser.email }));
      }
    } catch (error) {
      console.error('Email update error:', error);
    }
  };

  const handlePasswordUpdate = async (newPassword: string) => {
    const userId = ensureUserId();
    if (!userId) return;

    try {
      await updateUser({
        variables: {
          input: { userId, password: newPassword },
        },
      });
    } catch (error) {
      console.error('Password update error:', error);
    }
  };

  return (
    <Card className="border-0 w-[375px] h-[756px] shadow-none">
      <CardHeader className="items-center justify-center">
        <CardTitle>Хэрэглэгчийн хэсэг</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!user && <p className="text-sm text-red-500 mb-4">Та нэвтрээгүй байна. Мэдээлэл засахын тулд нэвтэрнэ үү.</p>}

        <div className="flex flex-col items-center mb-6">
          <ProfilePictureUpload currentImage={user?.profile ?? ''} onImageUpdate={handleProfilePictureUpdate} isLoading={false} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="text-sm text-gray-500">Утас:</p>
              <p className="font-medium">{user?.phoneNumber || 'Оруулаагүй'}</p>
            </div>
            <EditPhoneDialog phone={user?.phoneNumber || ''} onUpdate={handlePhoneUpdate} isLoading={false} />
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="text-sm text-gray-500">Имэйл:</p>
              <p className="font-medium">{user?.email || 'Оруулаагүй'}</p>
            </div>
            <EditEmailDialog currentEmail={user?.email || ''} onUpdate={handleEmailUpdate} isLoading={false} />
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <p className="text-sm text-gray-500">Нууц үг:</p>
              <p className="font-medium">••••••••••</p>
            </div>
            <EditPasswordDialog onUpdate={handlePasswordUpdate} isLoading={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
