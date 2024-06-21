'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { inputOne, inputThree, inputTwo } from '../../constants';

export const Steps = () => {
  return (
    <div>
      {inputOne.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
      {inputTwo.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
      {inputThree.map((item, index) => (
        <div key={index}>
          <label>{item.label}</label>
          <Input type={item.type} placeholder={item.placeholder} name={item.name} value="" />
        </div>
      ))}
    </div>
  );
};
