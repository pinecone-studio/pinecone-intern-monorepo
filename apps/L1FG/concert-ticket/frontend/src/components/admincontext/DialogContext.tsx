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

export const ConcertFormProvider: React.FC<{
  children: React.ReactNode;
  onSubmit?: (_data: FormData) => void;
}> = ({ children, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    concertName: '',
    concertPhoto: '',
    concertPlan: '',
    artistName: [''],
    concertDay: new Date(),
    concertTime: '00:00',
    vipTicket: { quantity: 0, price: 0 },
    regularTicket: { quantity: 0, price: 0 },
    standingAreaTicket: { quantity: 0, price: 0 },
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
    const { name, value } = e.target;

    const parseTicketValue = (value: string) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 0 : parsed;
    };

    if (name.startsWith('vipTicket.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        vipTicket: {
          ...prev.vipTicket,
          [field]: parseTicketValue(value),
        },
      }));
    } else if (name.startsWith('regularTicket.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        regularTicket: {
          ...prev.regularTicket,
          [field]: parseTicketValue(value),
        },
      }));
    } else if (name.startsWith('standingAreaTicket.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        standingAreaTicket: {
          ...prev.standingAreaTicket,
          [field]: parseTicketValue(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      date: dates || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const processedData = {
        ...formData,
        vipTicket: {
          quantity: parseInt(String(formData.vipTicket.quantity), 10),
          price: parseInt(String(formData.vipTicket.price), 10),
        },
        regularTicket: {
          quantity: parseInt(String(formData.regularTicket.quantity), 10),
          price: parseInt(String(formData.regularTicket.price), 10),
        },
        standingAreaTicket: {
          quantity: parseInt(String(formData.standingAreaTicket.quantity), 10),
          price: parseInt(String(formData.standingAreaTicket.price), 10),
        },
      };
      onSubmit(processedData);
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
