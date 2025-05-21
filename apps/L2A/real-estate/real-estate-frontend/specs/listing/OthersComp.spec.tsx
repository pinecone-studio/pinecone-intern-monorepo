import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OthersComp from '@/app/listing/_components/OthersComp';

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}));

jest.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({
    id,
    checked,
    onCheckedChange,
  }: {
    id: string;
    checked: boolean;
    // eslint-disable-next-line no-unused-vars
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

describe('OthersComp', () => {
  it('renders all labels and checkboxes', () => {
    render(
      <OthersComp
        garage=""
        setGarage={jest.fn()}
        lift=""
        setLift={jest.fn()}
        balcony=""
        setBalcony={jest.fn()}
      />
    );
    expect(screen.getByText('Бусад')).toBeInTheDocument();
    expect(screen.getByLabelText('Дулаан зогсоол')).toBeInTheDocument();
    expect(screen.getByLabelText('Лифт')).toBeInTheDocument();
    expect(screen.getByLabelText('Агуулах')).toBeInTheDocument();
  });

  it('toggles garage checkbox correctly', () => {
    const setGarage = jest.fn();
    render(
      <OthersComp
        garage=""
        setGarage={setGarage}
        lift=""
        setLift={jest.fn()}
        balcony=""
        setBalcony={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Дулаан зогсоол'));
    expect(setGarage).toHaveBeenCalledWith('true');
  });

  it('untoggles garage checkbox correctly', () => {
    const setGarage = jest.fn();
    render(
      <OthersComp
        garage="true"
        setGarage={setGarage}
        lift=""
        setLift={jest.fn()}
        balcony=""
        setBalcony={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Дулаан зогсоол'));
    expect(setGarage).toHaveBeenCalledWith('');
  });

  it('toggles lift checkbox correctly', () => {
    const setLift = jest.fn();
    render(
      <OthersComp
        garage=""
        setGarage={jest.fn()}
        lift=""
        setLift={setLift}
        balcony=""
        setBalcony={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Лифт'));
    expect(setLift).toHaveBeenCalledWith('true');
  });

  it('toggles balcony checkbox correctly', () => {
    const setBalcony = jest.fn();
    render(
      <OthersComp
        garage=""
        setGarage={jest.fn()}
        lift=""
        setLift={jest.fn()}
        balcony=""
        setBalcony={setBalcony}
      />
    );
    fireEvent.click(screen.getByLabelText('Агуулах'));
    expect(setBalcony).toHaveBeenCalledWith('true');
  });

    it('untoggles lift checkbox correctly', () => {
    const setLift = jest.fn();
    render(
      <OthersComp
        garage=""
        setGarage={jest.fn()}
        lift="true"
        setLift={setLift}
        balcony=""
        setBalcony={jest.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Лифт'));
    expect(setLift).toHaveBeenCalledWith('');
  });

  it('untoggles balcony checkbox correctly', () => {
    const setBalcony = jest.fn();
    render(
      <OthersComp
        garage=""
        setGarage={jest.fn()}
        lift=""
        setLift={jest.fn()}
        balcony="true"
        setBalcony={setBalcony}
      />
    );
    fireEvent.click(screen.getByLabelText('Агуулах'));
    expect(setBalcony).toHaveBeenCalledWith('');
  });
});
