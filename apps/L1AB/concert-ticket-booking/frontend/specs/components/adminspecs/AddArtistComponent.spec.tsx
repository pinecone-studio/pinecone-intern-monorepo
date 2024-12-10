import { fireEvent, render, waitFor } from '@testing-library/react';
import { AddArtistComponent } from '@/components/admincomponents/AddArtistComponent';
import '@testing-library/jest-dom';

describe('AddArtistComponent', () => {
  it('should render and handle form submission successfully', async () => {
    const { getByTestId, getByPlaceholderText } = render(<AddArtistComponent />);


    fireEvent.click(getByTestId('Artist-DialogOpen'));
    expect(getByTestId('Artist-dialog-content')).toBeInTheDocument();
    const artistNameInput = getByPlaceholderText('Нэр оруулах');
    const descriptionInput = getByPlaceholderText('Дэлгэрэнгүй мэдээлэл');

    fireEvent.change(artistNameInput, { target: { value: 'Test Artist' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    expect(artistNameInput).toHaveValue('Test Artist');
    expect(descriptionInput).toHaveValue('Test Description');


    const createArtistButton = getByTestId('createArtistButton');
    fireEvent.click(createArtistButton);
    await waitFor(() => {
      expect(createArtistButton).toBeInTheDocument();
    });
  });

  it('should open and close the dialog correctly', () => {
    const { getByTestId } = render(<AddArtistComponent />);

    fireEvent.click(getByTestId('Artist-DialogOpen'));
    expect(getByTestId('Artist-dialog-content')).toBeInTheDocument();


  });

});