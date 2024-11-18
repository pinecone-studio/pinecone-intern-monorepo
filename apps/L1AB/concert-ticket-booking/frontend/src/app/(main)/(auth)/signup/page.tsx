'use client';
import { Container } from '@/components';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import FormInput from './FormInput';
import PasswordInput from './PasswordInput';

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
  return (
    <Container>
      <div className={styles.container} data-cy="Sign-Up-Page">
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <p className={styles.title}>Бүртгүүлэх</p>
          </div>
          <div className={styles.form}>
            <FormInput id="name" label="Нэр:" placeholder="Таны нэр" dataCy="Sign-Up-Name-Input" />
            <FormInput id="phone" label="Утасны дугаар:" type="tel" placeholder="Утасны дугаар" dataCy="Sign-Up-Phone-Input" />
            <FormInput id="email" label="Имэйл хаяг:" type="email" placeholder="name@example.com" dataCy="Sign-Up-Email-Input" />
            <PasswordInput id="password" label="Нууц үг:" dataCy="Sign-Up-Password-Input" />
            <PasswordInput id="confirm-password" label="Нууц үг давтах:" dataCy="Sign-Up-Confirm-Password-Input" />

            <Button data-cy="Sign-Up-Submit-Button" className={styles.button}>
              <span>Бүртгүүлэх</span>
            </Button>

            <p className={styles.footerText}>
              Та бүртгэлтэй хаягтай бол{' '}
              <Link data-cy="Sign-Up-Link" href="/signin" className={styles.footerLink}>
                нэвтрэх
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
