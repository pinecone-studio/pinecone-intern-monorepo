'use client';

import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { useAuth } from '../providers';
import { FormInput, PasswordInput } from '../ui';

const signinSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
});

export const SigninForm = () => {
  const { signin, error: authError, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signinSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await signin(values);
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
                    className={meta.touched && meta.error ? 'border-red-400 focus:border-transparent focus:ring-2 focus:ring-red-400' : ''}
                  />
                )}
              </Field>
              <ErrorMessage name="email" component="div" className="text-red-400 text-xs" />
            </div>
            <div className="space-y-1">
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <PasswordInput 
                    label="Password" 
                    placeholder="Enter your password" 
                    {...field} 
                    className={meta.touched && meta.error ? 'border-red-400 focus:border-transparent focus:ring-2 focus:ring-red-400' : ''} 
                  />
                )}
              </Field>
              <ErrorMessage name="password" component="div" className="text-red-400 text-xs" />
            </div>
            <Button type="submit" className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 transition" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
};
