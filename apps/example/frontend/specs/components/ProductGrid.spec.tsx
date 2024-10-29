import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProductsGrid } from '../../src/components';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetProductsDocument } from '../../src/generated';

const mock: MockedResponse = {
  request: {
    query: GetProductsDocument,
  },
  result: {
    data: {
      products: [
        {
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
        },
      ],
    },
  },
};

describe('ProductGrid', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]}>
        <ProductsGrid />
      </MockedProvider>
    );
  });
});
