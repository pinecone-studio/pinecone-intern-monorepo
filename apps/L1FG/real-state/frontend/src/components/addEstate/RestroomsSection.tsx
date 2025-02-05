import React from 'react';

const RestroomsSection: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="restrooms-section">
      <label htmlFor="restrooms" className="block text-gray-700 font-bold mb-2">
        Ариун цэврийн өрөө:
      </label>
      <input id="restrooms" type="number" name="restrooms" value={formData.restrooms} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="restrooms" />
    </div>
  );
};

export default RestroomsSection;
