'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ArrowIcon from '@/assets/icons/ArrowICon';
import { useAuth } from '@/common/providers/AuthProvider';


const LoginForm = () => {
  const { handleSignIn } = useAuth();
  const router = useRouter();
  const validationSchema = yup.object({
    email: yup
      .string()
      .test('is-email', 'Имэйл хаяг байх ёстой', function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(value as string);

        return isEmail;
      })
      .required('Имэйл хаяг оруулна уу'),
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
      await handleSignIn(values.email, values.password);
      router.push('/');
    },
  });

  return (
    <div data-testid="sign-in-page" className="w-[440px] h-[484px] border border-[1px solid #ECEDF0] rounded-[16px] p-[40px]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-[24px]">
        <h1 className="text-[36px] font-semibold">Нэвтрэх</h1>
        <div className="flex flex-col items-center gap-[16px]">
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Имэйл</p>
            <Input
              data-testid="email-input"
              name="email"
              type="text"
              className="w-[360px] h-[56px] text-[18px] font-normal bg-[#F7F7F8]"
              placeholder="Имэйл хаягаа оруулна уу"
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
          <Button data-cy="submit-btn" type="submit" className="w-[360px] h-[56px] bg-[#121316] rounded-[8px] relative">
            <p className="text-[16px] font-medium">Дараах</p>
            
            <ArrowIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
