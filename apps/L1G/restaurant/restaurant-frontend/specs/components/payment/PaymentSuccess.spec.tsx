/** @jest-environment jsdom */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// next/navigation → useRouter mock
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
import { useRouter } from 'next/navigation';

// shadcn/ui Button-г жинхэнээр нь хэрэглэж болно. Хэрэв DOM warning гарч байвал дараах байдлаар энгийн button болгож mockлоорой.
// jest.mock('@/components/ui/button', () => ({
//   Button: ({ children, onClick, className, ...props }: any) => (
//     <button onClick={onClick} className={className} {...props}>
//       {children}
//     </button>
//   ),
// }));

import PaymentSuccess from '@/components/payment/PaymentSuccess';

describe('<PaymentSuccess />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test('renders success icon/text and the action button', () => {
    render(<PaymentSuccess />);

    // Гол текстүүд харагдаж байна уу?
    expect(screen.getByText(/Төлбөр амжилттай/i)).toBeInTheDocument();
    expect(screen.getByText(/төлөгдлөө/i)).toBeInTheDocument();

    // Үйлдлийн товч
    expect(screen.getByRole('button', { name: /Захиалгын дэлгэрэнгүй харах/i })).toBeInTheDocument();
  });

  test('clicking the button navigates to "/"', async () => {
    render(<PaymentSuccess />);
    const user = userEvent.setup();

    const btn = screen.getByRole('button', { name: /Захиалгын дэлгэрэнгүй харах/i });
    await user.click(btn);

    const { push } = useRouter() as unknown as { push: jest.Mock };
    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/');
  });
});
