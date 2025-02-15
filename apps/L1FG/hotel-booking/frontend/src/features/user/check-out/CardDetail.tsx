import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CountryDropdown } from './CountryDropdown';

export const CardDetail = () => {
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
            Name on card
          </label>
          <Input id="firstName" className="w-full" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Number on card
          </label>
          <Input id="firstName" className="w-full" value={formData.firstName} onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))} />
          <p className="text-sm text-gray-600">Please give us the name of one of the people staying in this room.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="middleName" className="text-sm font-medium">
              Expiration date
            </label>
            <Input id="middleName" placeholder="MM/YY" className="w-full" value={formData.middleName} onChange={(e) => setFormData((prev) => ({ ...prev, middleName: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Security code
            </label>
            <Input id="lastName" placeholder="CVV" className="w-full" value={formData.lastName} onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            Country
          </label>
          <CountryDropdown placeholder="Hong Kong" />
        </div>
      </div>
    </div>
  );
};
