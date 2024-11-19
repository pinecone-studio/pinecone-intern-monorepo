import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState } from 'react';

const styles = {
  container: 'text-amber-50 flex items-center justify-center h-[48rem]',
  formWrapper: 'rounded-2xl border-slate-500 border-[1px] flex-col py-8 px-12 gap-6',
  header: 'flex py-2 flex-col justify-center items-center',
  title: 'text-[#FAFAFA] text-2xl font-semibold tracking-[-0.6px]',
  form: 'flex flex-col items-center gap-6 self-stretch w-[350px]',
  inputGroup: 'flex flex-col items-start gap-1 self-stretch',
  label: 'block text-base font-medium text-gray-200',
  input: 'mt-1 block w-full rounded-md border border-gray-700 bg-[#09090B] p-2 text-white text-sm',
  passwordWrapper: 'relative w-full',
  passwordToggle: 'absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none',
  button: 'flex h-9 py-2 px-4 items-center w-full gap-2 self-stretch rounded-[6px] bg-[#00B7F4] shadow-sm text-[#18181B] hover:text-[#000000] hover:bg-[#54d0f9]',
  footerText: 'text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide',
  footerLink: 'hover:underline underline decoration-solid underline-offset-auto hover:text-[#54d0f9] duration-300',
  forgetPasswordLink: 'text-[#A1A1AA] self-stretch text-center text-sm leading-5 tracking-wide hover:underline hover:text-[#54d0f9]',
};

interface PasswordInputProps {
  id: string;
  label: string;
  dataCy: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, label, dataCy }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.passwordWrapper}>
        <Input id={id} type={visible ? 'text' : 'password'} data-cy={dataCy} aria-label={label} className={styles.input} />
        <button type="button" onClick={() => setVisible(!visible)} className={styles.passwordToggle} aria-label={visible ? 'Hide password' : 'Show password'} data-cy={`${dataCy}-Icons`}>
          {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;