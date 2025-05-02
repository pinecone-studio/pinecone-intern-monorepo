import { useState } from 'react';

export const CreatePostField = () => {
  const [field, setField] = useState('');
  return (
    <div>
      <label className="block text-sm text-[#09090B] pb-2">Талбай</label>
      <input
        id="post-field"
        name="field"
        type="number"
        value={field}
        data-testid="field"
        onChange={(e) => setField(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1"
      />
    </div>
  );
};
