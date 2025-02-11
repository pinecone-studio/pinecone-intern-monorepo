import SelectDemo from '@/components/ticketReservation/SelectDay';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

jest.mock('date-fns', () => ({
  format: jest.fn(),
}));
describe('SelectDemo Component', () => {
  it('should date value string', async () => {
    render(
      <MockedProvider>
        <SelectDemo date="concertDay" time="1" />
      </MockedProvider>
    );
  });
  it('should date value undifined', async () => {
    render(
      <MockedProvider>
        <SelectDemo date="" time="1" />
      </MockedProvider>
    );
  });
});
