import { useState } from "react";

export const CreatePostName = () => {
  const [name, setName] = useState('');
  
  return (
    <div>
      <label htmlFor="post-name" className="block text-sm text-[#09090B] pb-2">
        Нэр
      </label>
      <input
        id="post-name"
        type="text"
        value={name}
        data-testid="Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full block px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
};
