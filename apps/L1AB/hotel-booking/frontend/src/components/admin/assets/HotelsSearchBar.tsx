import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const HotelsSearchBar = () => {
  return (
    <div className="flex my-4 gap-2">
      <Input placeholder="Search" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="ulaanbaatar">Ulaabaatar</SelectItem>
          <SelectItem value="darkhan">Darkhan</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Rooms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rooms</SelectItem>
          <SelectItem value="oneBed">1 Bed</SelectItem>
          <SelectItem value="twoBed">2 Bed</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Star Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="5stars">5 stars</SelectItem>
          <SelectItem value="4stars">4 stars</SelectItem>
          <SelectItem value="3stars">3 stars</SelectItem>
          <SelectItem value="2stars">2 stars</SelectItem>
          <SelectItem value="1star">1 star</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="User Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="excellent">+9 Excellent</SelectItem>
          <SelectItem value="good">+8 Good</SelectItem>
          <SelectItem value="verygood">+7 Very good</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
