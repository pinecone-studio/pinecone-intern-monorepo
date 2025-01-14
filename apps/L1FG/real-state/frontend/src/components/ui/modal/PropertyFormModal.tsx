import React from 'react';

interface PropertyFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
  error: any;
}

export const PropertyFormModal: React.FC<PropertyFormProps> = ({ formData, onInputChange, onClose, onSubmit, loading, error }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Create Property</h2>
        <form className="space-y-4">
          {/* House Type */}
          <div>
            <label className="block text-sm font-medium">House Type</label>
            <select name="houseType" value={formData.houseType} onChange={onInputChange} className="w-full border rounded p-2">
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium">Size (m²)</label>
            <input type="text" name="size" value={formData.size} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* Year Built */}
          <div>
            <label className="block text-sm font-medium">Year Built</label>
            <input type="text" name="createdAt" value={formData.createdAt} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* Balcony */}
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="balcony" checked={formData.balcony} onChange={onInputChange} className="rounded" />
              <span>Balcony</span>
            </label>
          </div>


          {/* Floor Material */}
          <div>
            <label className="block text-sm font-medium">Floor Material</label>
            <input type="text" name="floorMaterial" value={formData.floorMaterial} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* Window Type */}
          <div>
            <label className="block text-sm font-medium">Window Type</label>
            <input type="text" name="windowType" value={formData.windowType} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input type="text" name="address" value={formData.address} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium">City</label>
            <input type="text" name="city" value={formData.city} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium">District</label>
            <input type="text" name="district" value={formData.district} onChange={onInputChange} className="w-full border rounded p-2" />
          </div>
        </form>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={onSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      </div>
    </div>
  );
};
