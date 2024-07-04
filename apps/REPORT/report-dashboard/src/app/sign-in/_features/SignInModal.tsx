'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ArrowIcon from '@/assets/icons/ArrowIcon';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';

const SignInModal = () => {
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string()
      .test('is-email-or-phoneNumber', 'Утас эсвэл имэйл хаяг байх ёстой', function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(value as string);
        const phoneRegex = /^\d{8}$|^\d{10}$/;
        const isPhoneNumber = phoneRegex.test(value as string);
        return isEmail || isPhoneNumber;
      })
      .required('Утас эсвэл имэйл хаяг оруулна уу'),
    password: yup
      .string()
      .required('Нууц үгээ оруулна уу')
      .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой')
      .matches(/[a-z]/, 'Жижиг үсэг байх ёстой')
      .matches(/[A-Z]/, 'Том үсэг байх ёстой')
      .matches(/[!@#$%^&*]/, 'Тусгай тэмдэгт байх ёстой'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      router.push('/');
    },
  });

  return (
    <div data-testid="sign-in-page" className="w-[440px] h-[484px] border border-[1px solid #ECEDF0] dark:border-[#E1E7EF] rounded-[16px] p-[40px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-[24px]">
        <h1 className="text-[36px] font-semibold">Report</h1>
        <div className="flex flex-col items-center gap-[16px]">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Таны имэйл эсвэл утасны дугаар</p>
            <Input
              data-testid="email-input"
              name="email"
              type="text"
              className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]"
              placeholder="Имэйл эсвэл утасны дугаар"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Нууц үг</p>
            <Input
              data-testid="password-input"
              name="password"
              type="password"
              className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]"
              placeholder="Нууц үгээ оруулна уу"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
          </div>
        </div>
        <div>
          <Button
            data-cy="submit-btn"
            type="submit"
            className="w-[360px] h-[56px] bg-[#121316] dark:hover:bg-black dark:hover:border-[1px] dark:hover:border-[#FFF] transition dark:bg-[#E1E7EF] rounded-[8px] relative group"
          >
            <p className="text-[16px] font-medium dark:group-hover:text-white transition">Дараах</p>
            <ArrowIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
