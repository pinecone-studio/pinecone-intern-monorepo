import { PersonalInfo } from './PersonalInfo';
import { GenderPreference } from './GenderPreference';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bio } from './Bio';
import Interests from './Interests';
import { DateOfBirth } from '../user/DateOfBirth';

export const ProfileSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Personal Information</h2>
        <p className="text-sm font-normal text-gray-500">This is how others will see you on the site.</p>
      </div>

      <PersonalInfo />
      <DateOfBirth />
      <GenderPreference />
      <Bio />
      <Interests />

      <div className="space-y-2">
        <label className="text-sm font-medium">Profession</label>
        <Input defaultValue="Software Engineer" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">School/Work</label>
        <Input defaultValue="Amazon" />
      </div>

      <Button className="bg-[#E11D48]">Update profile</Button>
    </div>
  );
};
