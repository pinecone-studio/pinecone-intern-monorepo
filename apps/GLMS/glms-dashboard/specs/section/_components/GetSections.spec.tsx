import React from 'react';
import { render } from '@testing-library/react';
import GetSections from '../../../src/app/section/_components/GetSections';
import { useGetSectionsQuery } from '../../../src/generated';

jest.mock('../../../src/generated', () => ({
  useGetSectionsQuery: jest.fn(),
}));

describe('GetSections', () => {
  it('renders section forms with data from useGetSectionsQuery', () => {
    const sectionsData = {
      getSections: [
        { id: '1', title: 'Section 1', description: 'Description 1', contentImage: 'Image 1' }
      ],
    };

    (useGetSectionsQuery as jest.Mock).mockReturnValueOnce({ data: sectionsData });

    const { getByTestId} = render(<GetSections/>);

    expect(getByTestId('get-sections-query')).toBeDefined();
  });

  it('renders section forms when data is null', () => {
    (useGetSectionsQuery as jest.Mock).mockReturnValueOnce({ data: null });

    const { getByTestId } = render(<GetSections/>);

    expect(getByTestId('get-sections-query')).toBeDefined();
  });

  it('renders section forms when data is undefined', () => {
    (useGetSectionsQuery as jest.Mock).mockReturnValueOnce({ data: undefined });

    const { getByTestId } = render(<GetSections/>);

    expect(getByTestId('get-sections-query')).toBeDefined();
  });
});
