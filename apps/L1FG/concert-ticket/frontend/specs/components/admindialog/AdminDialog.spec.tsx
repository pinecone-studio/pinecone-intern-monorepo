import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { AdminDialog } from '../../../src/components/adminfeature/AdminDialog';
import * as DialogContext from '../../../src/components/admincontext/DialogContext';
import '@testing-library/jest-dom';
jest.mock('../../../src/components/admincontext/DialogContext', () => ({
  useConcertForm: jest.fn(),
}));

describe('AdminDialog', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleArtistChange = jest.fn();
  const mockAddArtist = jest.fn();
  const mockRemoveArtist = jest.fn();
  const mockHandleDatesSelect = jest.fn();

  const mockFormData = {
    concertname: '',
    concertDescription: '',
    artistName: [''],
    dates: [],
    time: '',
    vipticketquantity: '',
    vipticketprice: '',
    regularticketquantity: '',
    regularticketprice: '',
    openfieldticketquantity: '',
    openfieldticketprice: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (DialogContext.useConcertForm as jest.Mock).mockReturnValue({
      formData: mockFormData,
      handleSubmit: mockHandleSubmit,
      handleChange: mockHandleChange,
      handleArtistChange: mockHandleArtistChange,
      addArtist: mockAddArtist,
      removeArtist: mockRemoveArtist,
      handleDatesSelect: mockHandleDatesSelect,
    });
  });

  it('renders the dialog with the correct title', () => {
    render(<AdminDialog />);
    const openDialogButton = screen.getByRole('button', { name: 'Тасалбар нэмэх' });
    fireEvent.click(openDialogButton);

    const dialogTitle = screen.getByRole('heading', { name: 'Тасалбар нэмэх' });
    expect(dialogTitle).toBeInTheDocument();
  });

  // it('calls handleChange when a file is selected', () => {
  //   const mockFile = new File(['dummy content'], 'concert-photo.jpg', { type: 'image/jpeg' });
  //   const concertPhotoInput = screen.getByPlaceholderText('Зураг оруулах');

  //   fireEvent.change(concertPhotoInput, { target: { files: [mockFile] } });
  //   expect(mockHandleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { files: [mockFile] } }));
  // });

  it('calls handleChange when input values change', () => {
    render(<AdminDialog />);
    const openDialogButton = screen.getByText('Тасалбар нэмэх');
    fireEvent.click(openDialogButton);

    const concertNameInput = screen.getByPlaceholderText('Нэр оруулах');
    fireEvent.change(concertNameInput, { target: { value: 'Test Concert' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });
  it('updates the artist name when an artist input changes', () => {
    render(<AdminDialog />);
    const openDialogButton = screen.getByText('Тасалбар нэмэх');
    fireEvent.click(openDialogButton);

    const artistInput = screen.getByPlaceholderText('Артистын нэр');
    fireEvent.change(artistInput, { target: { value: 'New Artist' } });
    expect(mockHandleArtistChange).toHaveBeenCalledWith(0, 'New Artist');
  });

  it('calls addArtist when the "Add Artist" button is clicked', () => {
    render(<AdminDialog />);
    const openDialogButton = screen.getByText('Тасалбар нэмэх');
    fireEvent.click(openDialogButton);

    const addArtistButton = screen.getByText('Бусад артист нэмэх +');
    fireEvent.click(addArtistButton);
    expect(mockAddArtist).toHaveBeenCalled();
  });

  it('calls removeArtist when the remove button is clicked', () => {
    (DialogContext.useConcertForm as jest.Mock).mockReturnValueOnce({
      formData: { ...mockFormData, artistName: ['Artist 1', 'Artist 2'] },
      handleSubmit: mockHandleSubmit,
      handleChange: mockHandleChange,
      handleArtistChange: mockHandleArtistChange,
      addArtist: mockAddArtist,
      removeArtist: mockRemoveArtist,
      handleDatesSelect: mockHandleDatesSelect,
    });

    render(<AdminDialog />);
    const openDialogButton = screen.getByText('Тасалбар нэмэх');
    fireEvent.click(openDialogButton);

    const removeArtistButton = screen.getByText('×');
    fireEvent.click(removeArtistButton);
    expect(mockRemoveArtist).toHaveBeenCalledWith(1);
  });

  it('calls handleSubmit when the form is submitted', () => {
    render(<AdminDialog />);
    const openDialogButton = screen.getByText('Тасалбар нэмэх');
    fireEvent.click(openDialogButton);

    const submitButton = screen.getByText('Үүсгэх');
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
