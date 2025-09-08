/* eslint-disable max-len */
/* eslint-disable max-lines */
/* eslint-disable complexity */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateUserMutation, type User } from '@/generated';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { EditPhoneDialog } from './EditPhoneDialog';
import { EditEmailDialog } from './EditEmailDialog';
import { EditPasswordDialog } from './EditPasswordDialog';
import { useAuth } from '@/app/context/AuthContext';

// --- Helper functions ---
const updateUserData = async (updateUser: ReturnType<typeof useUpdateUserMutation>[0], userId: string, input: { email: string; password: string; phoneNumber: string; profile: string }) => {
  const { data } = await updateUser({ variables: { userId, input } });
  return data?.updateUser;
};

const safeSetUser = (setUser: ReturnType<typeof useAuth>['setUser'], update: Partial<{ email: string; phoneNumber: string | null; profile: string | null }>) => {
  setUser((prev) => (prev ? { ...prev, ...update } : prev));
};

const createUpdateInput = (user: User, overrides: Partial<User>) => ({
  email: overrides.email ?? user.email ?? '',
  password: overrides.password ?? user.password ?? '',
  phoneNumber: overrides.phoneNumber ?? user.phoneNumber ?? '',
  profile: overrides.profile ?? user.profile ?? '',
});

const handleUserUpdate = async (user: User, updateUser: ReturnType<typeof useUpdateUserMutation>[0], overrides: Partial<User>) => {
  const input = createUpdateInput(user, overrides);
  return await updateUserData(updateUser, user.userId, input);
};

// --- Sub-components ---
interface SectionProps {
  user: User | null;
  updateUser: ReturnType<typeof useUpdateUserMutation>[0];
  setUser: ReturnType<typeof useAuth>['setUser'];
}

interface PasswordSectionProps {
  user: User | null;
  updateUser: ReturnType<typeof useUpdateUserMutation>[0];
}

const ProfileSection = ({ user, updateUser, setUser }: SectionProps) => {
  const handleUpdate = async (profile: string) => {
    if (!user) return;

    const input = {
      email: user.email ?? '',
      password: user.password ?? '',
      phoneNumber: user.phoneNumber ?? '',
      profile,
    };

    const updated = await updateUserData(updateUser, user.userId, input);
    if (updated?.profile) {
      safeSetUser(setUser, { profile: updated.profile });
    }
  };

  return (
    <div className="flex flex-col items-center mb-6" data-testid="profile-picture">
      <ProfilePictureUpload currentImage={user?.profile ?? ''} onImageUpdate={handleUpdate} isLoading={false} />
    </div>
  );
};

const PhoneSection = ({ user, updateUser, setUser }: SectionProps) => {
  const handleUpdate = async (phoneNumber: string) => {
    if (!user) return;

    const updated = await handleUserUpdate(user, updateUser, { phoneNumber });
    if (updated?.phoneNumber) {
      safeSetUser(setUser, { phoneNumber: updated.phoneNumber });
    }
  };

  return (
    <div className="flex justify-between items-center py-3 border-b" data-testid="phone-section">
      <div>
        <p className="text-sm text-gray-500">Утас:</p>
        <p className="font-medium">{user?.phoneNumber || 'Оруулаагүй'}</p>
      </div>
      <EditPhoneDialog phone={user?.phoneNumber || ''} onUpdate={handleUpdate} isLoading={false} />
    </div>
  );
};

const EmailSection = ({ user, updateUser, setUser }: SectionProps) => {
  const handleUpdate = async (email: string) => {
    if (!user) return;

    const updated = await handleUserUpdate(user, updateUser, { email });
    if (updated?.email) {
      safeSetUser(setUser, { email: updated.email });
    }
  };

  return (
    <div className="flex justify-between items-center py-3 border-b" data-testid="email-section">
      <div>
        <p className="text-sm text-gray-500">Имэйл:</p>
        <p className="font-medium">{user?.email || 'Оруулаагүй'}</p>
      </div>
      <EditEmailDialog currentEmail={user?.email || ''} onUpdate={handleUpdate} isLoading={false} />
    </div>
  );
};

const PasswordSection = ({ user, updateUser }: PasswordSectionProps) => {
  const handleUpdate = async (newPassword: string) => {
    if (!user) return;

    await handleUserUpdate(user, updateUser, { password: newPassword });
  };

  return (
    <div className="flex justify-between items-center py-3" data-testid="password-section">
      <div>
        <p className="text-sm text-gray-500">Нууц үг:</p>
        <p className="font-medium">••••••••••</p>
      </div>
      <EditPasswordDialog onUpdate={handleUpdate} isLoading={false} />
    </div>
  );
};

// --- Main component ---
export const UpdateUserProfile = () => {
  const [updateUser] = useUpdateUserMutation();
  const { user, setUser } = useAuth();

  if (!user) {
    return (
      <Card className="border-0 w-[375px] h-[756px] shadow-none">
        <CardHeader className="items-center justify-center">
          <CardTitle>Хэрэглэгчийн хэсэг</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-red-500 mb-4">Та нэвтрээгүй байна. Мэдээлэл засахын тулд нэвтэрнэ үү.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 w-[375px] h-[756px] shadow-none">
      <CardHeader className="items-center justify-center">
        <CardTitle>Хэрэглэгчийн хэсэг</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ProfileSection user={user} updateUser={updateUser} setUser={setUser} />
        <div className="space-y-4">
          <PhoneSection user={user} updateUser={updateUser} setUser={setUser} />
          <EmailSection user={user} updateUser={updateUser} setUser={setUser} />
          <PasswordSection user={user} updateUser={updateUser} />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Тестүүдэд ашиглах export-ууд ---
export { ProfileSection, PhoneSection, EmailSection, PasswordSection, safeSetUser, createUpdateInput };
