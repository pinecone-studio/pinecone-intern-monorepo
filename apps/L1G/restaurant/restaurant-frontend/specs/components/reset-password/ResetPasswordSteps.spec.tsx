'use client';

import { ResetPasswordSteps } from '@/components/reset-password/ResetPasswordSteps';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';

// Mock the components
jest.mock('@/components/reset-password/StepOne', () => ({
  StepOne: () => <div>Step One</div>,
}));

jest.mock('@/components/reset-password/StepTwo', () => ({
  StepTwo: () => <div>Step Two</div>,
}));

jest.mock('@/components/reset-password/StepThree', () => ({
  StepThree: () => <div>Step Three</div>,
}));

describe('ResetPasswordSteps', () => {
  render(
    <MockedProvider addTypename={false}>
      <ResetPasswordSteps />
    </MockedProvider>
  );
});
