'use client';
import { Input } from '@/components/ui/input';
import { whosCheckingIn } from '@/features/user/check-out/GuestInfoSection';

type WhosCheckingInProps = {
  whosCheckingInData: whosCheckingIn;
};

export const WhosCheckingIn = ({whosCheckingInData} : WhosCheckingInProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First name
          </label>
          <Input id="firstName" className="w-full" value={whosCheckingInData.formData.firstName} onChange={(e) => whosCheckingInData.setFormData({firstName : e.target.value})} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>{' '}
        <div className="flex flex-col gap-2">
          <label htmlFor="middleName" className="text-sm font-medium">
            Middle name
          </label>
          <Input id="middleName" className="w-full" value={whosCheckingInData.formData.middleName} onChange={(e) => whosCheckingInData.setFormData({middleName: e.target.value})} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last name
          </label>
          <Input id="lastName" className="w-full" value={whosCheckingInData.formData.lastName} onChange={(e) => whosCheckingInData.setFormData({lastName : e.target.value})} />
        </div>
      </div>
    </div>
  );
};
