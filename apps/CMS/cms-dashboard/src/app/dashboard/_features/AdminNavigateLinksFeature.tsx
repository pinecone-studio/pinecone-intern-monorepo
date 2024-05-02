'use client';
import { NavigateLink, NavigateLinkWithIcon } from '../_components';
import { AiOutlinePlus } from 'react-icons/ai';

export const AdminNavigateLinksFeature = () => {
  return (
    <div
      data-cy="admin-navigate-links-feature-cy-id"
      className="w-[896px] h-[96px] flex flex-row items-center py-[16px] px-[32px] justify-between rounded-[50px] gap-2 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
    >
      <NavigateLink text="Нүүр" myPathName="/" />
      <NavigateLink text="Контент" myPathName="/dashboard" />
      <NavigateLink text="Сэтгэгдэл" myPathName="/" />
      <NavigateLink text="Статистик" myPathName="/" />
      <div className="divider lg:divider-horizontal" />
      <NavigateLinkWithIcon text="Контент нэмэх" myPathName="/articles/create-article" icon={<AiOutlinePlus />} />
    </div>
  );
};
