import React, { createContext, useContext, useState } from 'react';
import { FormData } from '../adminfeature/concert-type';
interface ConcertFormContextType {
  formData: FormData;
  addArtist: () => void;
  handleArtistChange: (_index: number, _value: string) => void;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  removeArtist: (_index: number) => void;
  handleDatesSelect: (_dates: Date[] | undefined) => void;
  handleSubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
}

const ConcertFormContext = createContext<ConcertFormContextType | undefined>(undefined);

export const ConcertFormProvider: React.FC<{ children: React.ReactNode; onSubmit?: (_data: FormData) => void }> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    concertname: '',
    concertPhoto: '',
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
  });

  const addArtist = () => {
    setFormData((prev) => ({
      ...prev,
      artistName: [...prev.artistName, ''],
    }));
  };

  const handleArtistChange = (index: number, value: string) => {
    const newArtists = [...formData.artistName];
    newArtists[index] = value;
    setFormData((prev) => ({
      ...prev,
      artistName: newArtists,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const removeArtist = (index: number) => {
    if (formData.artistName.length > 1) {
      const newArtists = formData.artistName.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        artistName: newArtists,
      }));
    }
  };

  const handleDatesSelect = (dates: Date[] | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dates: dates || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const value = {
    formData,
    addArtist,
    handleArtistChange,
    handleChange,
    removeArtist,
    handleDatesSelect,
    handleSubmit,
  };

  return <ConcertFormContext.Provider value={value}>{children}</ConcertFormContext.Provider>;
};

export const useConcertForm = () => {
  const context = useContext(ConcertFormContext);
  if (context === undefined) {
    throw new Error('useConcertForm must be used within a ConcertFormProvider');
  }
  return context;
};
