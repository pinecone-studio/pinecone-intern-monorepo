'use client';

import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { useAuth } from '../providers';
import { FormInput, PasswordInput } from '../ui';

const signupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
});

export const SignupForm = () => {
  const { signup, error: authError, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      validationSchema={signupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await signup(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <>
          {authError && <div className="mb-4 rounded bg-[hsl(var(--destructive)/0.2)] px-4 py-2 text-red-400 text-sm text-center">{authError}</div>}
          <Form className="space-y-4">
            <div className="space-y-1">
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <FormInput
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    className={meta.touched && meta.error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
                  />
                )}
              </Field>
              <ErrorMessage name="email" component="div" className="text-red-400 text-xs" />
            </div>
            <div className="space-y-1">
              <Field name="username">
                {({ field, meta }: FieldProps) => (
                  <FormInput
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                    {...field}
                    className={meta.touched && meta.error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
                  />
                )}
              </Field>
              <ErrorMessage name="username" component="div" className="text-red-400 text-xs" />
            </div>
            <div className="space-y-1">
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <PasswordInput label="Password" placeholder="Enter your password" {...field} className={meta.touched && meta.error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''} />
                )}
              </Field>
              <ErrorMessage name="password" component="div" className="text-red-400 text-xs" />
            </div>
            <Button type="submit" className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 transition" disabled={isSubmitting}>
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};
