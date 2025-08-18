import { render, screen } from '@testing-library/react';
import { TicketBuy } from '@/components/TicketBuy';

// Mock DatePickerConcert to avoid external UI deps
jest.mock('@/components/DatePickerConcert', () => ({
  __esModule: true,
  default: () => <div data-testid="date-picker-concert">DatePicker Mock</div>,
}));

describe('TicketBuy Component', () => {
  it('renders without crashing', () => {
    const result = render(<TicketBuy />);
    if (!result.container) throw new Error('No container rendered');
  });

  it('renders the header text', () => {
    render(<TicketBuy />);
    const header = screen.getByText('Тоглолт үзэх өдрөө сонгоно уу.');
    if (!header) throw new Error('Header missing');
  });

  it('renders the DatePickerConcert component', () => {
    render(<TicketBuy />);
    const picker = screen.getByTestId('date-picker-concert');
    if (!picker) throw new Error('DatePickerConcert missing');
  });

  it('renders all ticket tiers', () => {
    render(<TicketBuy />);
    
    // Check first tier
    if (!screen.getByText('Завсарын тасалбар (38)')) throw new Error('First tier missing');
    if (!screen.getByText("99'000₮")) throw new Error('First tier price missing');
    
    // Check second tier
    if (!screen.getByText('Арын тасалбар (123)')) throw new Error('Second tier missing');
    const secondTierPrices = screen.getAllByText(/129.*000₮/);
    if (secondTierPrices.length === 0) throw new Error('Second tier price missing');
    
    // Check third tier
    if (!screen.getByText('Нүүрний тасалбар (38)')) throw new Error('Third tier missing');
    const thirdTierPrices = screen.getAllByText(/159.*000₮/);
    if (thirdTierPrices.length === 0) throw new Error('Third tier price missing');
  });

  it('renders the purchase button', () => {
    render(<TicketBuy />);
    const purchaseButton = screen.getByText('Тасалбар авах');
    if (!purchaseButton) throw new Error('Purchase button missing');
  });

  it('purchase button has correct styling', () => {
    render(<TicketBuy />);
    const purchaseButton = screen.getByText('Тасалбар авах');
    const className = purchaseButton.getAttribute('class') || '';
    
    // Check required classes
    const requiredClasses = ['py-2', 'px-4', 'text-black', 'bg-[#00B7F4]', 'rounded-md', 'text-sm', 'font-medium', 'w-full'];
    requiredClasses.forEach(requiredClass => {
      if (!className.includes(requiredClass)) {
        throw new Error(`Purchase button missing class: ${requiredClass}`);
      }
    });
  });

  it('renders dashed dividers', () => {
    render(<TicketBuy />);
    const dividers = document.querySelectorAll('hr');
    if (dividers.length !== 3) {
      throw new Error(`Expected 3 dividers, got ${dividers.length}`);
    }
  });

  it('divider has correct styling', () => {
    render(<TicketBuy />);
    const dividers = document.querySelectorAll('hr');
    
    dividers.forEach(divider => {
      const className = divider.getAttribute('class') || '';
      if (!className.includes('border-t')) throw new Error('Divider missing border-t');
      if (!className.includes('border-dashed')) throw new Error('Divider missing border-dashed');
      if (!className.includes('border-[#27272A]')) throw new Error('Divider missing border color');
    });
  });

  it('renders increment and decrement buttons', () => {
    render(<TicketBuy />);
    const incrementButtons = screen.getAllByText('+');
    const decrementButtons = screen.getAllByText('-');
    
    if (incrementButtons.length !== 3) {
      throw new Error(`Expected 3 increment buttons, got ${incrementButtons.length}`);
    }
    
    if (decrementButtons.length !== 3) {
      throw new Error(`Expected 3 decrement buttons, got ${decrementButtons.length}`);
    }
  });

  it('increment and decrement buttons have correct styling', () => {
    render(<TicketBuy />);
    const buttons = screen.getAllByText('+');
    
    buttons.forEach(button => {
      const className = button.getAttribute('class') || '';
      if (!className.includes('py-2')) throw new Error('Button missing py-2');
      if (!className.includes('px-4')) throw new Error('Button missing px-4');
      if (!className.includes('rounded-md')) throw new Error('Button missing rounded-md');
      if (!className.includes('border')) throw new Error('Button missing border');
      if (!className.includes('bg-[#1F1F1F]')) throw new Error('Button missing background');
    });
  });

  it('renders ticket summary section', () => {
    render(<TicketBuy />);
    
    // Check summary text
    if (!screen.getByText('Энгийн тасалбар x 3')) throw new Error('Summary line 1 missing');
    const summaryPrice1 = screen.getAllByText(/267.*000₮/);
    if (summaryPrice1.length === 0) throw new Error('Summary price 1 missing');
    
    if (!screen.getByText('VIP тасалбар x 2')) throw new Error('Summary line 2 missing');
    
    // Check that 258'000₮ appears at least twice (VIP and total)
    const twoFiftyEightAll = screen.getAllByText(/258.*000₮/);
    if (twoFiftyEightAll.length < 2) throw new Error('Expected two 258\'000₮ entries (VIP and total)');
    
    if (!screen.getByText('Нийт төлөх дүн:')) throw new Error('Total label missing');
  });

  it('main container has correct structure', () => {
    render(<TicketBuy />);
    const mainContainer = screen.getByText('Тасалбар авах').closest('div')?.parentElement;
    
    if (!mainContainer) {
      throw new Error('Main container not found');
    }
    
    const className = mainContainer.getAttribute('class') || '';
    if (!className.includes('bg-[#131313]')) throw new Error('Missing background color');
    if (!className.includes('h-fit')) throw new Error('Missing height fit');
    if (!className.includes('rounded-xl')) throw new Error('Missing rounded corners');
  });
});

