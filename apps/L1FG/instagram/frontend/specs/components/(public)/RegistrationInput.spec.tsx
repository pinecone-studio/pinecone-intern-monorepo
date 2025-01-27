import { RegistrationInput } from '@/components/(public)/RegistrationInput';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Registration input', () => {
  it('SHould render', () => {
    const onChangeMock = jest.fn();
    render(<RegistrationInput type="email" placeholder="Email" onChange={onChangeMock} required dataCy="mock" dataTestId="mock" />);
    fireEvent.change(screen.getByTestId('mock'), {
      target: { value: 'mock' },
    });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
