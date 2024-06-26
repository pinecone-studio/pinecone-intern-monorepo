'use client';

import React from 'react';

export const EmployeesOtherInformation = () => {
  return (
    <div data-testid="otherInfo">
      <div className="text-lg font-semibold tracking-wide w-[571px] h-6 mb-6">Нэмэлт Мэдээлэл</div>
      <div className="flex flex-col mb-6">
        <p className="text-[#3F4145] tracking-wide text-base font-normal">Яаралтай үед холбоо барих хүний дугаар</p>
        <p className="text-[#121316] tracking-wide font-semibold">88556061</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[#3F4145] tracking-wide text-base font-normal">Регистрийн дугаар</p>
        <p className="text-[#121316] tracking-wide text-base font-semibold">ЙО02240509</p>
      </div>
    </div>
  );
};
