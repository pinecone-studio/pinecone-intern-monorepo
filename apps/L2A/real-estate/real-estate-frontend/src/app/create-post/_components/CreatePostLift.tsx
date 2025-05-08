'use client';

import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select';

type Props = {
  name: string;
  value: string;
  onChange: (_value: string) => void;
  error?: string;
};

export const CreatePostLift = ({ name, value, onChange, error }: Props) => {
  return (
    <div>
      <label className="block text-sm text-[#09090B] pb-1" htmlFor={name}>
        Лифт
      </label>
      <Select
        name={name}
        value={value}
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <SelectTrigger
          id={name}
          data-testid="lift"
          className={`w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-ring'}`}
        >
          <SelectValue placeholder="Сонгоно уу" />
        </SelectTrigger>
        <SelectContent data-testid="type-options">
          <SelectGroup>
            <SelectItem data-testid="lift-option-yes" value="yes">
              Байгаа
            </SelectItem>
            <SelectItem data-testid="lift-option-no" value="no">
              Байхгүй
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="h-3 mt-1">{error ? <p className="text-red-500 text-sm">{error}</p> : <p className="text-sm invisible">placeholder</p>}</div>
    </div>
  );
};
