import { Container } from './assets';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';

import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UserContact = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="m-auto">
        <div className="container m-auto h-fit px-6 pt-10 pb-4">
          <h3 className="text-lg font-medium text-[#09090B]">Contact info</h3>
          <p className="text-[#71717A] text-sm font-thin mb-6">Receive account activity alerts and trip updates by sharing this information</p>
          <div className="border border-x-1 mb-6"></div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Phone number
              </Label>

              <div className="flex gap-2">
                <Input id="number" type="number" defaultValue="" placeholder="+976" className="w-20" />

                <Input id="Phone number" defaultValue="" placeholder="" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Email address
              </Label>
              <Input id="Email adress" defaultValue="" placeholder="" />
            </div>
          </div>
        </div>

        <div className="flex border border-x-1 mb-6"></div>

        <div className="container m-auto h-fit px-6 pt-2 pb-4">
          <h3 className="text-lg font-medium text-[#09090B]">Emergency Contact</h3>
          <p className="text-[#71717A] text-sm font-thin mb-6">In case of emergencies, having someone we can reach out to is essential.</p>

          <div className="flex gap-6">
            <div className="flex flex-col gap-4 mb-5">
              <Label htmlFor="name" className="text-left">
                Phone number
              </Label>
              <div className="flex gap-2">
                <Input id="number" type="number" defaultValue="" placeholder="+976" className="w-20" />

                <Input id="Phone number" defaultValue="" placeholder="" />
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <Label htmlFor="name" className="text-left">
                Relationship
              </Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Relationship</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="secondary" className="bg-[#2563EB] text-[#FAFAFA] font-medium ">
            Update profile
          </Button>
        </div>
      </div>
    </Container>
  );
};
