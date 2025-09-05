/* eslint-disable max-len */
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

  const handleProfilePictureUpdate = async (profile: string) => {
    const userId = ensureUserId();
    if (!userId || !user) return;

    try {
      const { data } = await updateUser({
        variables: {
          userId,
          input: {
            email: user.email,
            password: user.password || '',
            phoneNumber: user.phoneNumber || '',
            profile,
          },
        },
      });
      if (data?.updateUser) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                profile: data.updateUser.profile ?? undefined, // null-г undefined болгож дамжуулж байна
              }
            : prev
        );
      }
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handlePhoneUpdate = async (phoneNumber: string) => {
    const userId = ensureUserId();
    if (!userId || !user) return;

    try {
      const { data } = await updateUser({
        variables: {
          userId,
          input: {
            email: user.email,
            password: user.password || '',
            phoneNumber,
            profile: user.profile || '',
          },
        },
      });
      if (data?.updateUser) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                phoneNumber: data.updateUser.phoneNumber ?? undefined, // null-г undefined болгож дамжуулж байна
              }
            : prev
        );
      }
    } catch (error) {
      console.error('Phone update error:', error);
    }
  };

  const handleEmailUpdate = async (email: string) => {
    const userId = ensureUserId();
    if (!userId || !user) return;

    try {
      const { data } = await updateUser({
        variables: {
          userId,
          input: {
            email,
            password: user.password || '',
            phoneNumber: user.phoneNumber || '',
            profile: user.profile || '',
          },
        },
      });
      if (data?.updateUser) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                email: data.updateUser.email,
              }
            : prev
        );
      }
    } catch (error) {
      console.error('Email update error:', error);
    }
  };

  const handlePasswordUpdate = async (newPassword: string) => {
    const userId = ensureUserId();
    if (!userId || !user) return;

    try {
      await updateUser({
        variables: {
          userId,
          input: {
            email: user.email,
            password: newPassword,
            phoneNumber: user.phoneNumber || '',
            profile: user.profile || '',
          },
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

        <div className="flex flex-col items-center mb-6" data-testid="profile-picture">
          <ProfilePictureUpload currentImage={user?.profile ?? ''} onImageUpdate={handleProfilePictureUpdate} isLoading={false} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b" data-testid="phone-section">
            <div>
              <p className="text-sm text-gray-500">Утас:</p>
              <p className="font-medium">{user?.phoneNumber || 'Оруулаагүй'}</p>
            </div>
            <EditPhoneDialog phone={user?.phoneNumber || ''} onUpdate={handlePhoneUpdate} isLoading={false} />
          </div>

          <div className="flex justify-between items-center py-3 border-b" data-testid="email-section">
            <div>
              <p className="text-sm text-gray-500">Имэйл:</p>
              <p className="font-medium">{user?.email || 'Оруулаагүй'}</p>
            </div>
            <EditEmailDialog currentEmail={user?.email || ''} onUpdate={handleEmailUpdate} isLoading={false} />
          </div>

          <div className="flex justify-between items-center py-3" data-testid="password-section">
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
