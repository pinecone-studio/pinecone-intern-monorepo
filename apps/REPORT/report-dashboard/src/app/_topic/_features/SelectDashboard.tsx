'use client';
import { useEffect, useState } from 'react';
type MenuItem = string;
export const SelectDashboard = () => {
  const menu = ['Репорт', 'Сэдэв', 'Сурагч'];
  const [selected, setSelected] = useState<MenuItem>(menu[0]);
  console.log(selected);
  return (
    <div
      className="flex gap-3
      items-end h-[46px]"
    >
      {menu.map((menuItem) => {
        return (
          <div key={menuItem} onClick={() => setSelected(menuItem)}>
            <p>{menuItem}</p>
            <div className={`h-[2px]  ${selected == menuItem ? 'bg-black' : ''}`}></div>
          </div>
        );
      })}
    </div>
  );
};
