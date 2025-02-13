import React from 'react';

const TownDetails: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="town-details">
      <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
        Хот:
      </label>
      <input id="district" type="text" name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="district" />
      <label htmlFor="subDistrict" className="block text-gray-700 font-bold mb-2">
        Дүүрэг:
      </label>
      <input id="subDistrict" type="text" name="subDistrict" value={formData.subDistrict} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="subDistrict" />
      <label htmlFor="district" className="block text-gray-700 font-bold mb-2">
        Хороо:
      </label>
      <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="city" />
      <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
        Дэлгэрэнгүй:
      </label>
      <input id="address" type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="address" />
    </div>
  );
};

export default TownDetails;
