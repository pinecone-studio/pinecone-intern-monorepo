import React from 'react';

const WindowsSection: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="windows-section">
      <label htmlFor="completionDate" className="block text-gray-700 font-bold mb-2">
        Ашиглалтанд орсон он:
      </label>
      <input
        id="completionDate"
        type="date"
        name="completionDate"
        value={formData.completionDate}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        data-cy="completionDate"
      />
      <label htmlFor="windowsCount" className="block text-gray-700 font-bold mb-2">
        Цонхны тоо:
      </label>
      <input
        id="windowsCount"
        type="number"
        name="windowsCount"
        value={formData.windowsCount}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        data-cy="windowsCount"
      />
      <label htmlFor="windowType" className="block text-gray-700 font-bold mb-2">
        Цонхны төрөл:
      </label>
      <input id="windowType" type="text" name="windowType" value={formData.windowType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="windowType" />
    </div>
  );
};

export default WindowsSection;
