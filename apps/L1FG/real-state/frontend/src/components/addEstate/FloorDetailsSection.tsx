import React from 'react';

const FloorDetailsSection: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="floor-details-section">
      <label htmlFor="floorMaterial" className="block text-gray-700 font-bold mb-2">
        Шалны материал:
      </label>
      <input
        id="floorMaterial"
        type="text"
        name="floorMaterial"
        value={formData.floorMaterial}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        data-cy="floorMaterial"
      />
      <label htmlFor="totalFloors" className="block text-gray-700 font-bold mb-2">
        Нийт давхар:
      </label>
      <input id="totalFloors" type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="totalFloors" />
      <label htmlFor="floorNumber" className="block text-gray-700 font-bold mb-2">
        Давхар:
      </label>
      <input id="floorNumber" type="number" name="floorNumber" value={formData.floorNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="floorNumber" />
    </div>
  );
};

export default FloorDetailsSection;
