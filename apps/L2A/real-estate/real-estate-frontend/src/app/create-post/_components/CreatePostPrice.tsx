import { useState } from "react";

export const CreatePostPrice = () => {
  const [price, setPrice] = useState('');

  return (
    <div>
      <label htmlFor="post-price" className="block text-sm text-[#09090B] pb-2">
        Үнэ
      </label>
      <input
        id="post-price"
        name="price"
        type="number"
        value={price}
        data-testid="price"
        onChange={(e) => setPrice(e.target.value)}
        className="w-full block px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
      />
    </div>
  );
};