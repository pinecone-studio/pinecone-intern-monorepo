'use client';

import { useState } from 'react';

export const ToggleButtonForCommnent = ({ isChecked }: { isChecked: boolean }) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCommentPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex justify-between p-6">
      <div style={{ fontSize: '18px', fontStyle: 'normal', fontWeight: 600, lineHeight: '24px', color: 'black' }}>{checked ? 'Сэтгэгдэл идэвхтэй' : 'Сэтгэгдэл идэвхгүй'}</div>
      <input
        data-testid="input-test-id"
        onChange={toggleCommentPermission}
        checked={checked}
        type="checkbox"
        className={checked ? 'toggle [--tglbg:black]' : 'toggle [--tglbg:#f6f6f6]'}
        style={{ color: checked ? 'white' : 'black', background: checked ? 'white' : 'black' }}
      />
    </div>
  );
};