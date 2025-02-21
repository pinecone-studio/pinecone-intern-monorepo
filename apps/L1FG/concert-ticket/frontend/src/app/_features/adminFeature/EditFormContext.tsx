import React, { createContext, useContext, useState } from 'react';
import { EditFormData } from '@/components/adminfeature/concert-type';

interface EditFormContextType {
  formData: EditFormData;
  addArtist: () => void;
  handleArtistChange: (_index: number, _value: string) => void;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  removeArtist: (_index: number) => void;
  handleDatesSelect: (_dates: Date[] | undefined) => void;
  handleSubmit: (_e: React.FormEvent<HTMLFormElement>) => void;
}

const EditFormContext = createContext<EditFormContextType | undefined>(undefined);

interface EditFormProviderProps {
  children: React.ReactNode;
  initialData: EditFormData;
  onSubmit?: (_data: EditFormData) => void;
}

export const EditFormProvider: React.FC<EditFormProviderProps> = ({ children, initialData, onSubmit }) => {
  const [formData, setFormData] = useState<EditFormData>({
    concertName: initialData.concertName,
    concertPlan: initialData.concertPlan,
    artistName: initialData.artistName,
    concertDay: initialData.concertDay,
    concertTime: initialData.concertTime,
    vipTicket: initialData.vipTicket,
    regularTicket: initialData.regularTicket,
    standingAreaTicket: initialData.standingAreaTicket,
  });

  const addArtist = () => {
    setFormData((prev) => ({
      ...prev,
      artistName: [...prev.artistName],
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

    if (name.includes('.')) {
      const [ticketType, field] = name.split('.');
      if (ticketType === 'vipTicket' || ticketType === 'regularTicket' || ticketType === 'standingAreaTicket') {
        setFormData((prev) => ({
          ...prev,
          [ticketType]: {
            ...prev[ticketType as keyof Pick<EditFormData, 'vipTicket' | 'regularTicket' | 'standingAreaTicket'>],
            [field]: parseTicketValue(value),
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeArtist = (index: number) => {
    if (formData.artistName.length > 1) {
      setFormData((prev) => ({
        ...prev,
        artistName: prev.artistName.filter((_, i) => i !== index),
      }));
    }
  };

  const handleDatesSelect = (dates: Date[] | undefined) => {
    if (dates && dates[0]) {
      setFormData((prev) => ({
        ...prev,
        concertDay: dates[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <EditFormContext.Provider
      value={{
        formData,
        addArtist,
        handleArtistChange,
        handleChange,
        removeArtist,
        handleDatesSelect,
        handleSubmit,
      }}
    >
      {children}
    </EditFormContext.Provider>
  );
};

export const useEditForm = () => {
  const context = useContext(EditFormContext);
  if (!context) {
    throw new Error('useEditForm must be used within an EditFormProvider');
  }
  return context;
};
