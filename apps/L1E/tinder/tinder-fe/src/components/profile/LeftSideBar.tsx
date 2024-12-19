'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LeftSideBarProps {
  setStep: (_step: 'profile' | 'images') => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ setStep }) => {
  return (
    <div>
      <div className="lg:space-y-1">
        {/* Mobile version */}
        <div className="block lg:hidden w-[250px] h-[36px]">
          <Select onValueChange={setStep}>
            <SelectTrigger data-testid="select-btn">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem data-testid="option-profile" value="profile">
                Profile
              </SelectItem>
              <SelectItem data-testid="option-images" value="images">
                Images
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop version */}
        <div className="hidden lg:block space-y-1">
          <Button className="w-full justify-start font-normal bg-white hover:bg-[#F4F4F5] text-black" onClick={() => setStep('profile')}>
            Profile
          </Button>
          <Button className="w-full justify-start font-normal bg-white hover:bg-[#F4F4F5] text-black" onClick={() => setStep('images')}>
            Images
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
