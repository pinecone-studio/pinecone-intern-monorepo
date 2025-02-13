'use client';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const WhosCheckingIn = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneCountry: '+976',
    phoneNumber: '',
  });
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First name
          </label>
          <Input id="firstName" className="w-full" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>{' '}
        <div className="flex flex-col gap-2">
          <label htmlFor="middleName" className="text-sm font-medium">
            Middle name
          </label>
          <Input id="middleName" className="w-full" value={formData.middleName} onChange={(e) => setFormData((prev) => ({ ...prev, middleName: e.target.value }))} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last name
          </label>
          <Input id="lastName" className="w-full" value={formData.lastName} onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} />
        </div>
      </div>
    </div>
  );
};
