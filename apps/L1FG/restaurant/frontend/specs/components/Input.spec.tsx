import Input from '@/components/Input';
import { render } from '@testing-library/react';
describe('Input', () => {
  it('Input render successfull', async () => {
    render(
      <Input
        name={''}
        type={''}
        placeholder={''}
        onChange={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
