'use client';
import { useState } from 'react';

const ForgetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert('Шинэ нууц үг таарахгүй байна!');
      return;
    }
    alert('Нууц үг амжилттай шинэчлэгдлээ!');
  };
  return (
    <div className="min-h-screen bg-[#111113] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Захиалагчийн мэдээлэл</h1>
      <div className="bg-[#1c1c1e] p-8 rounded-xl max-w-2xl space-y-6">
        <div>
          <label htmlFor="current-password" className="block mb-2 text-lg">
            Хуучин нууц үг:
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block mb-2 text-lg">
            Шинэ нууц үг:
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block mb-2 text-lg">
            Шинэ нууц үг давтах:
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="text-right">
          <button onClick={handleSave} className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded">
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
