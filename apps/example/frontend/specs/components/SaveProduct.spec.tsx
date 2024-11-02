import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SaveProduct } from '../../src/components';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetSavedProductsDocument } from '../../src/generated';

const mock: MockedResponse = {
    request: {
        query: GetSavedProductsDocument,
    },
    result: {
        data: {
            getSavedProducts: [
                {
                    product: {
                        _id: '1',
                        name: 'Saved Product 1',
                        price: 100,
                        images: ['https://via.placeholder.com/150'],
                        category: {
                            _id: '1',
                            name: 'Category 1',
                            createdAt: '2023-01-01T00:00:00Z',
                            updatedAt: '2023-01-01T00:00:00Z',
                        },
                        description: 'A sample description for Product 1',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                },
                {
                    product: {
                        _id: '2',
                        name: 'Saved Product 2',
                        price: 200,
                        images: ['https://via.placeholder.com/150'],
                        category: {
                            _id: '2',
                            name: 'Category 2',
                            createdAt: '2023-01-01T00:00:00Z',
                            updatedAt: '2023-01-01T00:00:00Z',
                        },
                        description: 'A sample description for Product 2',
                        createdAt: '2023-01-01T00:00:00Z',
                        updatedAt: '2023-01-01T00:00:00Z',
                    },
                },
            ],
        },
    },
    delay: 200,
};

describe('SaveProduct', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should render saved products successfully', async () => {
        const { findAllByTestId } = render(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <SaveProduct />
            </MockedProvider>
        );

        const savedProductCards = await findAllByTestId('saved-product-card');

        expect(savedProductCards.length).toBe(2);

        expect(savedProductCards[0]).toHaveTextContent('Saved Product 1');
        expect(savedProductCards[1]).toHaveTextContent('Saved Product 2');
    });
});
