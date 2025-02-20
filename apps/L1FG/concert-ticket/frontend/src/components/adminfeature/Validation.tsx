import { FormData } from './concert-type';
import { toast } from 'react-toastify';

export const validateForm = (formData: FormData, setErrors: (_errors: Record<string, string>) => void): boolean => {
  const newErrors: Record<string, string> = {};

  const fieldValidations = [
    {
      key: 'concertName',
      condition: !formData.concertName.trim(),
      message: 'Тоглолтын нэр оруулна уу',
    },
    {
      key: 'concertPhoto',
      condition: !formData.concertPhoto.trim(),
      message: 'Зураг оруулна уу',
    },
    {
      key: 'concertPlan',
      condition: !formData.concertPlan.trim(),
      message: 'Хөтөлбөрийн тухай оруулна уу',
    },
    {
      key: 'concertDay',
      condition: !formData.concertDay,
      message: 'Тоглолтын өдөр сонгоно уу',
    },
    {
      key: 'concertTime',
      condition: !formData.concertTime.trim(),
      message: 'Тоглолтын цаг сонгоно уу',
    },
  ];

  fieldValidations.forEach(({ key, condition, message }) => {
    if (condition) {
      newErrors[key] = message;
    }
  });

  if (isArtistNameInvalid(formData.artistName)) {
    newErrors.artistName = 'Үндсэн артистын нэр оруулна уу';
  }

  const ticketTypes = [
    { ticket: formData.vipTicket, fieldPrefix: 'vipTicket', label: 'VIP' },
    { ticket: formData.regularTicket, fieldPrefix: 'regularTicket', label: 'Regular' },
    { ticket: formData.standingAreaTicket, fieldPrefix: 'standingAreaTicket', label: 'Задгай' },
  ];

  ticketTypes.forEach(({ ticket, fieldPrefix, label }) => {
    validateTicket(ticket, fieldPrefix, label, newErrors);
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const isArtistNameInvalid = (artistName: string[]): boolean => {
  return artistName.length === 0 || artistName[0].trim() === '';
};

const validateTicket = (ticket: { quantity: number; price: number }, fieldPrefix: string, label: string, errors: Record<string, string>) => {
  if (!ticket.quantity || ticket.quantity <= 0) {
    errors[`${fieldPrefix}.quantity`] = `${label} тасалбарын тоо хэмжээ оруулна уу`;
  }
  if (!ticket.price || ticket.price <= 0) {
    errors[`${fieldPrefix}.price`] = `${label} тасалбарын үнэ оруулна уу`;
  }
};

export const showToasts = (isValid: boolean) => {
  if (isValid) {
    toast.success('Тасалбар амжилттай нэмэгдлээ!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } else {
    toast.error('Формын мэдээллийг бүрэн оруулна уу!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};
