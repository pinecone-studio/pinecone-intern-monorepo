import React from 'react';

const ThirdStep = () => {
  return (
    <div className="w-full max-w-sm p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-black">Set new password</h2>
        <p className="text-sm text-gray-500">
          Use a minimum of 10 characters, including <br />
          uppercase letters, lowercase letters, and numbers
        </p>
      </div>
      <form className="space-y-4">
        <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
        <input type="password" placeholder="Confirm password" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
        <button type="submit" className="w-full py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition">
          Continue
        </button>
      </form>
    </div>
  );
};
export default ThirdStep;
