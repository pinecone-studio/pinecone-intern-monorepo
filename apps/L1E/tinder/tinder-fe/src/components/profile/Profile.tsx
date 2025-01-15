/* eslint-disable max-lines */
/* eslint-disable complexity */
'use client';

import { useGetUserByIdQuery, useUpdateUserMutation } from '@/generated';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';

interface UpdateData {
  username: string;
  email: string;
  interest: string;
  hobby: string;
  bio: string;
  profession: string;
  job: string;
  age: string;
  images: string[];
}

export const ProfileSection: React.FC = () => {
  const [updateData, setUpdateData] = useState<UpdateData>({
    username: '',
    email: '',
    interest: '',
    hobby: '',
    bio: '',
    profession: '',
    job: '',
    age: '',
    images: [''],
  });

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser._id);
      }
    }
  }, []);

  const validUserId = userId || '';

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useGetUserByIdQuery({
    variables: { userId: validUserId },
    skip: !validUserId,
  });

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.getUserById) {
      setUpdateData({
        username: data.getUserById.username || '',
        email: data.getUserById.email || '',
        interest: data.getUserById.interest || '',
        hobby: data.getUserById.hobby || '',
        bio: data.getUserById.bio || '',
        profession: data.getUserById.profession || '',
        job: data.getUserById.job || '',
        age: data.getUserById.age || '',
        images: data.getUserById.images || [''],
      });
    }
  }, [data]);

  const handleInputChange = (key: keyof UpdateData, value: string) => {
    setUpdateData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateUser({
        variables: {
          id: validUserId,
          input: updateData,
        },
      });
      console.log({ response });
      toast('Мэдээлэл амжилттай шинэчлэгдлээ!');
    } catch (error) {
      toast.error('Шинэчлэхэд алдаа гарлаа');
    }
  };

  if (!validUserId) return <p>Хэрэглэгчийн ID олдсонгүй. Нэвтэрч орно уу.</p>;
  if (queryLoading) return <p>Мэдээлэл ачаалж байна...</p>;
  if (queryError) return <p>Алдаа гарлаа: {queryError.message}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Personal Information</h2>
        <p className="text-sm font-normal text-gray-500">This is how others will see you on the site.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-gray-200 pt-4">
        <InputField label="Name" value={updateData.username} onChange={(value) => handleInputChange('username', value)} testId="name" />
        <InputField label="Mail" value={updateData.email} onChange={(value) => handleInputChange('email', value)} testId="email" />
      </div>
      <InputField label="Age" value={updateData.age} onChange={(value) => handleInputChange('age', value)} testId="age" />
      <SelectField
        label="Gender"
        value={updateData.interest}
        onChange={(value) => handleInputChange('interest', value)}
        testId="select"
        options={[
          { value: 'female', label: 'Эмэгтэй' },
          { value: 'male', label: 'Эрэгтэй' },
          { value: 'other', label: 'Бусад' },
        ]}
      />

      <TextareaField label="Bio" value={updateData.bio} onChange={(value) => handleInputChange('bio', value)} testId="bio" />
      <InputField label="Hobby" value={updateData.hobby} onChange={(value) => handleInputChange('hobby', value)} testId="Hobby" />
      <InputField label="Profession" value={updateData.profession} onChange={(value) => handleInputChange('profession', value)} testId="profession" />
      <InputField label="Job" value={updateData.job} onChange={(value) => handleInputChange('job', value)} testId="work" />
      {/* <InputField type="images" value={updateData.images} onChange={(value) => handleInputChange('images', value)} testId="images-input" /> */}
      <Button className="bg-[#E11D48]" onClick={handleUpdateProfile} data-testid="Update-profile"></Button>
    </div>
  );
};

const InputField = ({ label, value, onChange, testId }: { label: string; value: string; onChange: (_value: string) => void; testId?: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Input data-testid={testId} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (_value: string) => void;
  options: { value: string; label: string }[];
  testId?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div data-testid="selectField">
    <label>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} data-testid="select">
      {options.map((option) => (
        <option data-testid="value" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const TextareaField = ({ label, value, onChange, testId }: { label: string; value: string; onChange: (_value: string) => void; testId?: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Textarea data-testid={testId} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default ProfileSection;
