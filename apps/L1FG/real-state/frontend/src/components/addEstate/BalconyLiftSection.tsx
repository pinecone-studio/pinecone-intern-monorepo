import React from 'react';

const BalconyLiftSection: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4 w-full flex flex-col" data-cy="balcony-lift-section">
      <div className="mb-2">
        <label htmlFor="balcony" className="block text-gray-700 font-bold mb-2">
          Тагт:
        </label>
        <select id="balcony" name="balcony" value={formData.balcony ?? ''} onChange={handleChange} className="mr-2 w-[728px] border border-gray-300 rounded-md p-2" data-cy="select-balcony">
          <option value="" disabled>
            Сонгоно уу
          </option>
          <option value="true" data-cy="balcony-yes">
            Тийм
          </option>
          <option value="false" data-cy="balcony-no">
            Үгүй
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="lift" className="block text-gray-700 font-bold mb-2">
          Лифт:
        </label>
        <select id="lift" name="lift" value={formData.lift ?? ''} onChange={handleChange} className="mr-2 w-[728px] border border-gray-300 rounded-md p-2" data-cy="select-lift">
          <option value="" disabled>
            Сонгоно уу
          </option>
          <option value="true" data-cy="lift-yes">
            Тийм
          </option>
          <option value="false" data-cy="lift-no">
            Үгүй
          </option>
        </select>
      </div>
    </div>
  );
};

export default BalconyLiftSection;
