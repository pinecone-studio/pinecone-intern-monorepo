'use client';
import { useState } from 'react';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { format, parse } from 'date-fns';
import { cn } from '../../../../../../../../../libs/shadcn/src/lib/utils';
import { ProfileUsernameEmailInput } from '../_components/ProfileUsernameEmailInput';
import { ProfileHeader } from '../_components/ProfileHeader';
import { ProfileInterest } from '../_components/ProfileInterest';

const userdata = {
  name: 'Elon Musk',
  email: 'test@email.com',
  gender: 'male',
  dob: '21 Aug 1990',
  bio: 'Adventurous spirit with a passion for travel, photography, and discovering new cultures while pursuing a career in graphic design.',
  interestOptions: ['Art', 'Music', 'Investment', 'Technology', 'Design', 'Education', 'Health'],
  profession: 'Software Engineer',
  schoolOrWork: 'Amazon',
};
export const ProfileForm = () => {
  const [date, setDate] = useState<Date | undefined>(() => parse(userdata.dob, 'dd MMM yyyy', new Date()));
  const [editUserdata, setEditUserdata] = useState(userdata);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setEditUserdata((prev) => ({
        ...prev,
        dob: format(selectedDate, 'dd MMM yyyy'),
      }));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(editUserdata.interestOptions);
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="space-y-6">
        <ProfileHeader />
        <ProfileUsernameEmailInput handleChange={handleChange} editUserdata={editUserdata} />
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" name="day" className={cn('w-full justify-between text-left font-normal border', !date && 'text-muted-foreground')}>
                {date ? format(date, 'dd MMM yyyy') : '21 Aug 1990'}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={parse(editUserdata.dob, 'dd MMM yyyy', new Date())} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">Your date of birth is used to calculate your age.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender Preferences:</Label>
          <div className="relative">
            <select
              id="gender"
              className="w-full h-10 px-3 py-2 bg-background border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
              defaultValue={editUserdata.gender}
              onChange={handleChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Everyone">Everyone</option>
            </select>
            <ChevronDownIcon data-testid="gender-chevron" className="absolute right-3 top-3 h-4 w-4 opacity-50" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" placeholder="Tell us about yourself" className="min-h-[100px]" defaultValue={editUserdata.bio} onChange={handleChange} />
        </div>

       <ProfileInterest setEditUserdata={setEditUserdata} editUserdata={editUserdata} />

        <div className="space-y-2">
          <Label htmlFor="profession">Profession</Label>
          <Input id="profession" defaultValue="Software Engineer" onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school">School/Work</Label>
          <Input id="school" defaultValue={editUserdata.schoolOrWork} onChange={handleChange} />
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => console.log(editUserdata)}>
          Update profile
        </Button>
      </div>
    </div>
  );
};
