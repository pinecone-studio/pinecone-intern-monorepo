import LeftSideBar from '@/components/profile/LeftSideBar';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

describe('LeftSideBar', () => {
  it('should render left side', async () => {
    const { getByTestId } = render(<LeftSideBar step="profile" setStep={jest.fn()} />);

    const selectBtn = getByTestId('select-btn'); // Dropdown сонгох товчийг олох

    fireEvent.keyDown(selectBtn, { key: 'Enter' }); // Dropdown-ыг нээхийн тулд "Enter" товч дарах

    const selectOption = getByTestId('option-images'); // "Images" сонголтын элементийг олох

    fireEvent.keyDown(selectOption, { key: 'Enter' }); // "Images" сонголтыг идэвхжүүлэхийн тулд "Enter" товч дарах
    expect(selectBtn);
    expect(selectOption);

    const mockSetStep = jest.fn();
    render(<LeftSideBar step="profile" setStep={mockSetStep} />);
    fireEvent.keyDown(selectOption, { key: 'Enter' });
  });
});
