import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SaveProductCard } from '../../src/components';

const product = {
    _id: '1',
    name: 'Product 1',
    price: 100,
    images: ['https://via.placeholder.com/150'],
    category: {
        _id: '1',
        name: 'Category 1',
        createdAt: '',
        updatedAt: '',
    },
    description: '',
    createdAt: '',
    updatedAt: '',
};

describe('SaveProductCard', () => {
    it('should render successfully', async () => {
        render(<SaveProductCard {...product} />);
    });
});
