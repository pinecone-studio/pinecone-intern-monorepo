import React from 'react';

type RegisterNewEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RegisterNewEmployeeModal: React.FC<RegisterNewEmployeeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button type="button" onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-black">×</button>
        <h2 className="text-xl font-bold mb-4">Шинэ ажилтан бүртгэх</h2>
        <p className="mb-4">Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.</p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Нэр, Овог</label>
            <input type="text" placeholder="Энд бичих.." className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Албан тушаал</label>
            <input type="text" placeholder="Энд бичих.." className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Имэйл</label>
            <input type="email" placeholder="Энд бичих.." className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ажилд орсон огноо</label>
            <input type="date" className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Эрхийн тохируулах</label>
            <select className="w-full border rounded p-2">
              <option>Сонгох</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-200 text-black rounded px-4 py-2">Буцах</button>
            <button type="submit" className="bg-black text-white rounded px-4 py-2">Нэмэх</button>
          </div>
        </form>
      </div>
    </div>
  );
};