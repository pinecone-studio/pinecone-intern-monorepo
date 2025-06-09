'use client';
import type { GuestDetails } from '@/utils/type';
import type React from 'react';

interface GuestDetailsFormProps {
  guestDetails: GuestDetails;
  onChange: (_details: GuestDetails) => void;
}

export const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({ guestDetails, onChange }) => {
  const handleChange = (field: keyof GuestDetails, value: string) => {
    onChange({ ...guestDetails, [field]: value });
  };

  return (
    <div className="space-y-4 mb-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">1. Who&#39;s checking in?</h2>
        <p className="text-gray-500 text-sm mb-4">
          Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            data-cy="first-name"
            value={guestDetails.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            data-cy="last-name"
            value={guestDetails.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};
