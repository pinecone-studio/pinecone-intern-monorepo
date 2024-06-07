import { useState } from 'react';

export const SideBarProfile = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  type sideBarItems = {
    id: number;
    text: string;
  };

  const sideBarItems = [
    {
      id: 1,
      text: 'Хэрэглэгч',
    },
    {
      id: 2,
      text: 'Сорилтын түүх',
    },
    {
      id: 3,
      text: 'Даалгаврын түүх',
    },
  ];
  return (
    <>
      <ul className="menu rounded-[12px] p-[32px] w-full flex flex-col gap-[24px] bg-white text-black dark:text-[#ededed] dark:bg-[#3d3d3def]">
        {sideBarItems.map((sideLists) => (
          <li key={sideLists.id} onClick={toggleCollapsed} className={`text-[16px] hover:font-[700] cursor-pointer ${collapsed ? 'font-[400]' : 'font-[700]'}`}>
            {sideLists.text}
          </li>
        ))}
      </ul>
    </>
  );
};
