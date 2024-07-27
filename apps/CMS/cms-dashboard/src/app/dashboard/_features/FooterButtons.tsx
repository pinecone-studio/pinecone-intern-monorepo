'use client';
import { NavigateLink, NavigateLinkWithIcon } from '../_components';
import { AiOutlinePlus } from 'react-icons/ai';

export const FooterButtons = () => {
  return (
    <div
      data-cy="admin-navigate-links-feature-cy-id"
      className="max-w-screen-2xl h-[96px] flex flex-row items-center p-[24px] justify-between rounded-[50px] gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white"
    >
      <NavigateLink text="Нүүр" myPathName="/" />
      <NavigateLink text="Контент" myPathName="/dashboard" />
      <NavigateLink text="Сэтгэгдэл" myPathName="/comments" />
      <NavigateLink text="Статистик" myPathName="/statistics" />
      <div className="divider lg:divider-horizontal" />
      <NavigateLinkWithIcon text="Контент нэмэх" myPathName="/articles/add" icon={<AiOutlinePlus />} />
    </div>
  );
};
