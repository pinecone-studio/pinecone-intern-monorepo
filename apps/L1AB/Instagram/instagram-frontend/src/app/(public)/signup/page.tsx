'use client';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import Link from 'next/link'
import InstagramLogo from '@/components/assets/icons/InstagramLogo';
const validationSchema = Yup.object({
  mobileNumberorEmail: Yup.string()
    .email('Invalid email or mobile number')
    .required('Mobile number or email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password must be at least 8 characters'),
  fullname: Yup.string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username must be at least 3 characters'),
});

const Page = () => {
  const router = useRouter();

  const handleSubmit = (values: { mobileNumberorEmail: string; password: string; fullname: string; username: string }) => {
    localStorage.setItem(
      'userData',
      JSON.stringify({
        mobileNumberorEmail: values.mobileNumberorEmail,
        password: values.password,
        fullname: values.fullname,
        username: values.username,
      })
    );
    router.push('/login');
  };

  return (
    <div className='h-screen flex flex-col items-center py-20 bg-gray-100 gap-4'
      data-cy="Sign-Up-Page">   
      <div className=' w-[364px] flex flex-col items-center rounded-xl py-8 gap-4 bg-white'>
         <div>
           <InstagramLogo/>
        </div>
        <p className='w-[70%] flex justify-center text-center'>
        Sign up to see photos and videos     from your friends
        </p>
        <Formik initialValues={{ mobileNumberorEmail: '', password: '', fullname: '', username: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, errors }) => (
           <Form className="w-[84%]">
           <div className="mb-3">
             <label htmlFor="mobileNumberorEmail" className="sr-only">Mobile Number or Email</label>
             <Field
               className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
               data-cy="Sign-Up-mobileNumberorEmail-Input"
               placeholder="Mobile Number or Email"
               name="mobileNumberorEmail"
               type="text"
               style={{ border: '1px solid #ccc', padding: '6px', margin: '5px 0' }}
             />
             {errors.mobileNumberorEmail && (
               <div className="text-red-600 text-xs mt-1" data-cy="Sign-Up-mobileNumberorEmail-Input-Error-Message">
                 {errors.mobileNumberorEmail}
               </div>
             )}
           </div>
           <div className="mb-3">
             <label htmlFor="password" className="sr-only">Password</label>
             <Field
               className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
               data-cy="Sign-Up-Password-Input"
               placeholder="Password"
               name="password"
               type="password"
               style={{ border: '1px solid #ccc', padding: '6px', margin: '5px 0' }}
             />
             {errors.password && (
               <div className="text-red-600 text-xs mt-1" data-cy="Sign-Up-password-Input-Error-Message">
                 {errors.password}
               </div>
             )}
           </div>
           <div className="mb-3">
             <label htmlFor="fullname" className="sr-only">Full Name</label>
             <Field
               className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
               data-cy="Sign-Up-fullname-Input"
               placeholder="Full Name"
               name="fullname"
               type="text"
               style={{ border: '1px solid #ccc', padding: '6px', margin: '5px 0' }}
             />
             {errors.fullname && (
               <div className="text-red-600 text-xs mt-1" data-cy="Sign-Up-fullname-Input-Error-Message">
                 {errors.fullname}
               </div>
             )}
           </div>
           <div className="mb-3">
             <label htmlFor="username" className="sr-only">Username</label>
             <Field
               className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
               data-cy="Sign-Up-username-Input"
               placeholder="Username"
               name="username"
               type="text"
               style={{ border: '1px solid #ccc', padding: '6px', margin: '5px 0' }}
             />
             {errors.username && (
               <div className="text-red-600 text-xs mt-1" data-cy="Sign-Up-username-Input-Error-Message">
                 {errors.username}
               </div>
             )}
           </div>
              <div className="text-gray-400 text-sm pt-2">
  <p>
    People who use our service may have uploaded your contact information to Instagram.{' '}
    <button className="text-blue-500">
      Learn
    </button>
    <button className="text-blue-500 px-32">
      More
    </button>
  </p>
</div>
<div className="text-gray-400 text-sm pt-4">
  <p className="text-sm text-center">
    By signing up, you agree to our{' '}
    <Link href="/terms" className="text-blue-500">
      Terms
    </Link>
    ,{' '}
    <Link href="/privacy" className="text-blue-500">
      Privacy Policy
    </Link>
    {' '}and{' '}
    <Link href="/cookies" className="text-blue-500">
      Cookies Policy
    </Link>.
  </p>
</div>
              <button className='w-full h-12 bg-[#2563EB] rounded-lg text-white my-6' data-cy="Sign-Up-Submit-Button" type="submit" disabled={isSubmitting} >
Sign up              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='w-[364px] h-[4.5rem] bg-white rounded-lg flex items-center justify-center'>
      <p className="text-sm text-center w-[10.4rem] flex justify-between">
       Have an account?
        <Link href="/login" className="text-blue-500">
        {' '}Log in
        </Link>
      </p>
    </div>
</div>
  );
};
export default Page;