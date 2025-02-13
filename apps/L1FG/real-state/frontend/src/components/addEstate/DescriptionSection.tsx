import React from 'react';

const DescriptionSection: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="description-section">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
        Дэлгэрэнгүй тайлбар:
      </label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="description" />
    </div>
  );
};

export default DescriptionSection;
