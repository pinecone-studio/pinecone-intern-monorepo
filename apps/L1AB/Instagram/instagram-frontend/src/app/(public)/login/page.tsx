'use client';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InstagramIcon from '@/components/icon/InstagramIcon';
import { useLoginMutation } from '@/generated';

const Page = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleSubmit = async (values: { usernameOrEmail: string; password: string }) => {
    const { data } = await login({
      variables: {
        username: values.usernameOrEmail,
        email: values.usernameOrEmail,
        password: values.password,
      },
    });
    if (data) {
      localStorage.setItem('userToken', data.login.user._id);
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-[223px] bg-gray-100 gap-4" data-cy="Login-Page">
      <div className=" w-[364px] flex flex-col items-center rounded-xl py-8 gap-4 bg-white">
        <InstagramIcon />
        <Formik initialValues={{ usernameOrEmail: '', password: '' }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-[84%]">
              <div className="mb-3">
                <label htmlFor="usernameOrEmail" className="sr-only">
                  Username or Email
                </label>
                <Field
                  className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
                  data-cy="Login-usernameOrEmail-Input"
                  placeholder="Username or Email"
                  name="usernameOrEmail"
                  type="text"
                  style={{ border: '1px solid #ccc', padding: '8px 12px', margin: '5px 0' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  className="rounded-lg placeholder-gray-500 placeholder-opacity-70 text-sm w-full"
                  data-cy="Login-Password-Input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  style={{ border: '1px solid #ccc', padding: '8px 12px', margin: '5px 0' }}
                />
              </div>
              <div className="text-[#2563EB] text-sm pt-4 flex justify-center">
                <Link href="/forgotpassword" data-cy="forgot-password-button">
                  Forgot password?
                </Link>
              </div>
              <button className="w-full h-10 bg-[#2563EB50] hover:bg-blue-500 rounded-lg text-white my-6" data-cy="Login-Submit-Button" type="submit" disabled={isSubmitting}>
                Login{' '}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-[364px] min-h-[72px] bg-white rounded-lg flex items-center justify-center">
        <p className="text-sm text-center w-full py-4 px-[62px] flex gap-4">
          Don’t have an account?
          <Link href="/signup" data-cy="sign-up-button" className="text-blue-500 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Page;
