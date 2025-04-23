'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

const SignInForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log('Logging in with:', values);
      }}
    >
      {() => (
        <Form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Field
              name="email"
              type="text"
              placeholder="name@example.com"
              data-testid="email-input"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <ErrorMessage name="email">
              {(msg) => <div className="text-red-500 text-sm" data-testid="email-error">{msg}</div>}
            </ErrorMessage>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 flex justify-between">
              <span>Password</span>
              <Link href="#" className="text-blue-500 text-sm">Forget password?</Link>
            </label>
            <Field
              name="password"
              type="password"
              placeholder="••••••••"
              data-testid="password-input"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <ErrorMessage name="password">
              {(msg) => <div className="text-red-500 text-sm" data-testid="password-error">{msg}</div>}
            </ErrorMessage>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Continue
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;


