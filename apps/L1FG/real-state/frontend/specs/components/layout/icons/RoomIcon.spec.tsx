import { RoomIcon } from '@/components/layout/icons/RoomIcon';
import { render } from 'react-dom';

describe('RoomIcom', () => {
  it('should render successfully', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<RoomIcon />, container);
  });
});
