'use client';
import type { ContactInfo } from '@/utils/type';
import type React from 'react';

interface ContactInfoFormProps {
  contactInfo: ContactInfo;
  onChange: (_info: ContactInfo) => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ contactInfo, onChange }) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...contactInfo, [field]: value });
  };

  return (
    <div className="space-y-4 mb-8 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">2. Contact Information</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            data-cy="email"
            value={contactInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Your confirmation email goes here</p>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone number
          </label>
          <div className="flex">
            <input
              type="text"
              id="phone"
              data-cy="phone"
              value={contactInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
