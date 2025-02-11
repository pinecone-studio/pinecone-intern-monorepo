import React from 'react';
import { HouseTypeEnum } from '@/generated';

const PropertyDetails: React.FC<{ formData: any; handleChange: any }> = ({ formData, handleChange }) => {
  return (
    <div className="mb-4" data-cy="property-details">
      <div className="mt-4 mb-4 border-gray-300 rounded">
        <h2 className="text-xl font-bold mb-2">Ерөнхий мэдээлэл</h2>
        <p className="text-gray-700">Та үл хөдлөх хөрөнгийн ерөнхий мэдээллийг оруулна уу. Үүнд: байршил, үнэ, өрөөний тоо, талбайн хэмжээ гэх мэт.</p>
      </div>
      <label htmlFor="houseType" className="block text-gray-700 font-bold mb-2">
        Байшингийн төрөл:
      </label>
      <select id="houseType" name="houseType" value={formData.houseType ?? ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="houseType">
        <option value="" disabled>
          Сонгоно уу
        </option>
        <option value={HouseTypeEnum.Apartment}>Орон сууц</option>
        <option value={HouseTypeEnum.House}>Хувийн сууц</option>
        <option value={HouseTypeEnum.Office}>Оффис</option>
      </select>
      <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
        Нэр:
      </label>
      <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="title" />
      <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
        Үнэ:
      </label>
      <input id="price" type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="price" />
      <label htmlFor="size" className="block text-gray-700 font-bold mb-2">
        Хэмжээ:
      </label>
      <input id="size" type="text" name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="size" />
      <label htmlFor="totalRooms" className="block text-gray-700 font-bold mb-2">
        Нийт өрөө:
      </label>
      <input id="totalRooms" type="number" name="totalRooms" value={formData.totalRooms} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="totalRooms" />
      <label htmlFor="garage" className="block text-gray-700 font-bold mb-2">
        Гараж:
      </label>
      <select id="garage" name="garage" value={formData.garage ?? ''} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mb-4" data-cy="garage">
        <option value="" disabled>
          Сонгоно уу
        </option>
        <option value="true">Тийм</option>
        <option value="false">Үгүй</option>
      </select>
    </div>
  );
};

export default PropertyDetails;
