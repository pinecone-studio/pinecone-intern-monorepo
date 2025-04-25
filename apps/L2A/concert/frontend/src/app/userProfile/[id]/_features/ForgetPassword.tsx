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
      <h1 className="text-3xl font-bold mb-8" data-cy="profile-header">
        Захиалагчийн мэдээлэл
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Нууц үг сэргээх</h2>
      <div className="bg-[#1c1c1e] p-8 rounded-xl max-w-2xl space-y-6" data-cy="password-form">
        <div>
          <label htmlFor="current-password" className="block mb-2 text-lg">
            Хуучин нууц үг:
          </label>
          <input
            id="current-password"
            data-cy="current-password"
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
            data-cy="new-password"
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
            data-cy="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="text-right">
          <button onClick={handleSave} data-cy="save-password" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded">
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
