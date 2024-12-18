'use client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LeftSideBar = () => {
  return (
    <div>
      <div className="lg:space-y-1">
        <div className="block lg:hidden w-[250px] h-[36px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="images">Images</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="hidden lg:block space-y-1">
          <Button className="w-full justify-start font-normal bg-white hover:bg-[#F4F4F5] text-black ">Profile</Button>
          <Button className="w-full justify-start font-normal bg-white hover:bg-[#F4F4F5] text-black">Images</Button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
