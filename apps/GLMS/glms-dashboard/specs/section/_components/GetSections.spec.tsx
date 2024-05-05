import React from 'react';
import { render } from '@testing-library/react';
import GetSections from '../../../src/app/section/_components/GetSections';
import { useGetSectionsQuery } from '../../../src/generated';

// Mock the useGetSectionsQuery hook
jest.mock('../../../src/generated', () => ({
  useGetSectionsQuery: jest.fn(),
}));
describe('GetSections', () => {
  it('renders section forms with data from useGetSectionsQuery', () => {
    const sectionsData = {
      getSections: [
        { id: '1', title: 'Html', description: 'Html intro', contentImage: 'image.jpg' }
      ],
    };
    (useGetSectionsQuery as jest.Mock).mockReturnValueOnce({ data: sectionsData });

    const { getByTestId } = render(<GetSections />);

    expect(getByTestId('get-sections-query')).toBeDefined();
    expect(getByTestId('section-form')).toBeDefined();
    expect(getByTestId('title')).toBeDefined();
    expect(getByTestId('description')).toBeDefined();
    expect(getByTestId('contentImage')).toBeDefined();
  });
});
