'use client';

import React, { useState } from 'react';

const UserProfile = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log('Phone:', phone);
    console.log('Email:', email);
    alert('Хувийн мэдээлэл хадгалагдлаа.');
  };

  return (
    <main className="flex-1 p-8" data-cy="user-profile">
      <h1 className="text-3xl font-bold mb-8" data-cy="profile-title">
        Захиалагчийн мэдээлэл
      </h1>
      <div className="bg-[#1c1c1e] p-8 rounded-xl space-y-6 max-w-4xl" data-cy="profile-form">
        <div>
          <label htmlFor="phone" className="block text-lg mb-2">
            Утасны дугаар:
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="9900-0000"
            value={phone}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9-]*$/.test(value)) {
                setPhone(value);
              }
            }}
            data-cy="input-phone"
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg mb-2">
            Имэйл хаяг:
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-cy="input-email"
            className="w-full px-4 py-2 rounded bg-black text-white border border-gray-700 focus:outline-none"
          />
        </div>
        <div className="text-right">
          <button onClick={handleSave} data-cy="save-profile-button" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded">
            Хадгалах
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
