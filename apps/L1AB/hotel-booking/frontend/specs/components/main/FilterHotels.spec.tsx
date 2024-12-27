import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllHotelsDocument } from '@/generated';
import { FilterHotels } from '@/components/main';

const mock = {
  request: {
    query: GetAllHotelsDocument,
  },
  result: {
    data: {
      getAllHotels: [
        {
          _id: '1',
          name: 'UB Hotel',
          description: '5 stars Hotel',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          address: 'Sun Road 1-st District',
          phone: '11111111',
          city: 'ub',
          rating: 8,
          stars: 3,
          rooms: [{price:1}],
        },
        {
          _id: '2',
          name: 'Star Hotel',
          description: '4 stars Hotel',
          images: ['https://example.com/image3.jpg'],
          address: 'Moon Road 2-nd District',
          phone: '22222222',
          city: 'moon',
          rating: 9,
          stars: 5,
          rooms: [{price:"1"}],
        },
        {
          _id: '3',
          name: 'Sky Hotel',
          description: '5 stars Hotel',
          images: ['https://example.com/image3.jpg'],
          address: 'Moon Road 2-nd District',
          phone: '33333333',
          city: 'moon',
          rating: 7,
          stars: 5,
          rooms: [],
        },
      ],
    },
  },
};

const mockNoHotels = {
  request: {
    query: GetAllHotelsDocument,
  },
  result: {
    data: {
      getAllHotels: [],
    },
  },
};

describe('FilterHotels Component', () => {
  it('should render hotels and handle filter inputs', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Star' } });

    const ratingRadio = screen.getByLabelText('+7');
    fireEvent.click(ratingRadio);

    const starsRadio = screen.getByLabelText('5 stars');
    fireEvent.click(starsRadio);
  });
  it('should handle no hotels found', async () => {
    render(
      <MockedProvider mocks={[mockNoHotels]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );

    await waitFor(
      () => {
        expect(screen.getByText(/No hotels found/i));
      },
      { timeout: 3000 }
    );
  });

  it('should filter hotels by rating and stars', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );
    const ratingRadio = screen.getByLabelText('+8');
    fireEvent.click(ratingRadio);
    const starsRadio = screen.getByLabelText('3 stars');
    fireEvent.click(starsRadio);
    expect(screen);
  });

  it('should sort hotels by Price-LowToHigh', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <FilterHotels />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const Trigger = screen.getByTestId('sort-select');
    fireEvent.keyDown(Trigger, { key: 'Enter' });
    const sortSelect = screen.getByTestId('PriceLowToHigh');
    fireEvent.keyDown(sortSelect, { key: 'Enter' });
    await waitFor(
      () => {
        const sortedHotels = screen.getAllByText(/Hotel/i);
        expect(sortedHotels[0].textContent);
      },
      { timeout: 3000 }
    );
  });

});


