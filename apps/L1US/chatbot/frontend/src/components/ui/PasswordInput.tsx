import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, placeholder, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`mt-1 block w-full pr-10 rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground ${className || ''}`}
        {...props}
      />
      <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute top-1/2 right-0 flex items-center pr-3 text-xs text-muted-foreground hover:text-foreground">
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};
