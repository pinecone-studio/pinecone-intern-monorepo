'use client';
import { useEffect, useState } from 'react';
type MenuItem = string;
export const SelectDashboard = () => {
  const menu = [
    { id: 1, name: 'Репорт' },
    { id: 2, name: 'Сэдэв' },
    { id: 3, name: 'Сурагч' },
  ];
  const [selected, setSelected] = useState<MenuItem>(menu[0].name);
  console.log(selected);
  return (
    <div
      className="flex gap-3
      items-end h-[46px]"
    >
      {menu.map((menuItem) => {
        return (
          <div key={menuItem.id} onClick={() => setSelected(menuItem.name)}>
            <p data-testid={`option-${menuItem.id}`}>{menuItem.name}</p>
            <div data-testid={`Black-${menuItem.id}`} className={`h-[2px]  ${selected == menuItem.name ? 'bg-black' : ''}`}></div>
          </div>
        );
      })}
    </div>
  );
};
