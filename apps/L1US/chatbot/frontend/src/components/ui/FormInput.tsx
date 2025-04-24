import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, name, type, placeholder, className, ...props }) => {
  return (
    <div>
      <Label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground ${className || ''}`}
        {...props}
      />
    </div>
  );
};
