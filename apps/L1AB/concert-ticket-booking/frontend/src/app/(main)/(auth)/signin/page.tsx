'use client';
import { Container } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';

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

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Container>
      <div className={styles.container} data-cy="Sign-In-Page">
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <p className={styles.title}>Нэвтрэх</p>
          </div>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Имэйл хаяг:
              </label>
              <Input data-cy="Sign-In-Email-Input" id="email" type="email" placeholder="name@example.com" aria-label="Имэйл хаяг" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Нууц үг:
              </label>
              <div className={styles.passwordWrapper}>
                <Input data-cy="Sign-In-Password-Input" id="password" type={passwordVisible ? 'text' : 'password'} aria-label="Нууц үг" className={styles.input} />
                <button
                  data-cy="Sign-In-Password-Input-Icons"
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className={styles.passwordToggle}
                  aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                >
                  {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              <div className="flex justify-end w-full">
                <a data-cy="Sign-In-ForgetPassword-link" href="/forget" className={styles.forgetPasswordLink}>
                  Нууц үг мартсан?
                </a>
              </div>
            </div>

            <Button data-cy="Sign-In-Submit-Button" className={styles.button}>
              <label>Нэвтрэх</label>
            </Button>

            <p className={styles.footerText}>
              Та бүртгэлтэй хаяггүй бол{' '}
              <Link href="/signup" className={styles.footerLink}>
                бүртгүүлэх
              </Link>{' '}
              хэсгээр орно уу.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
