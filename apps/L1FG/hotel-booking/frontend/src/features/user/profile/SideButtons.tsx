'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Register from './Register';

import { SecuritySettings } from './SecuritySettings';
import Contact from './Contact';

const SideButtons: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'personal' | 'contact' | 'security'>('personal');

  const renderButton = (section: 'personal' | 'contact' | 'security', label: string) => (
    <Button
      onClick={() => setActiveSection(section)}
      className={`flex justify-start h-9 rounded-md px-4 py-2 gap-2 bg-white text-black shadow-none hover:bg-gray-100 text-sm font-medium font-inter transition-all ${
        activeSection === section ? 'bg-gray-200' : ''
      }`}
    >
      {label}
    </Button>
  );

  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-[250px]">
        {renderButton('personal', 'Personal Information')}
        {renderButton('contact', 'Contact Info')}
        {renderButton('security', 'Security & Settings')}
      </div>

      <div className="flex">
        {activeSection === 'personal' && <Register />}
        {activeSection === 'contact' && <Contact />}
        {activeSection === 'security' && <SecuritySettings />}
      </div>
    </div>
  );
};

export default SideButtons;
