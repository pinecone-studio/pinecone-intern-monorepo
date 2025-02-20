/*eslint-disable*/
import { validateForm, showToasts } from '@/components/adminfeature/Validation';
import { toast } from 'react-toastify';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Form Validation', () => {
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    mockSetErrors.mockClear();
    jest.clearAllMocks();
  });

  const validFormData = {
    concertName: 'Test Concert',
    concertPhoto: 'photo.jpg',
    concertPlan: 'Concert Plan',
    concertDay: new Date(),
    concertTime: '19:00',
    artistName: ['Artist 1'],
    vipTicket: { quantity: 100, price: 100000 },
    regularTicket: { quantity: 200, price: 50000 },
    standingAreaTicket: { quantity: 300, price: 30000 },
  };

  describe('validateForm', () => {
    it('should return true for valid form data', () => {
      const isValid = validateForm(validFormData, mockSetErrors);
      expect(isValid).toBe(true);
      expect(mockSetErrors).toHaveBeenCalledWith({});
    });

    it('should validate required fields', () => {
      const invalidFormData = {
        ...validFormData,
        concertName: '',
        concertPhoto: '',
      };

      const isValid = validateForm(invalidFormData, mockSetErrors);

      expect(isValid).toBe(false);
      expect(mockSetErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          concertName: 'Тоглолтын нэр оруулна уу',
          concertPhoto: 'Зураг оруулна уу',
        })
      );
    });

    it('should validate artist name', () => {
      const invalidFormData = {
        ...validFormData,
        artistName: [],
      };

      const isValid = validateForm(invalidFormData, mockSetErrors);

      expect(isValid).toBe(false);
      expect(mockSetErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          artistName: 'Үндсэн артистын нэр оруулна уу',
        })
      );
    });

    it('should validate empty artist name array', () => {
      const invalidFormData = {
        ...validFormData,
        artistName: [''],
      };

      const isValid = validateForm(invalidFormData, mockSetErrors);

      expect(isValid).toBe(false);
      expect(mockSetErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          artistName: 'Үндсэн артистын нэр оруулна уу',
        })
      );
    });

    describe('Ticket Validation', () => {
      it('should validate VIP ticket', () => {
        const invalidFormData = {
          ...validFormData,
          vipTicket: { quantity: 0, price: 0 },
        };

        const isValid = validateForm(invalidFormData, mockSetErrors);

        expect(isValid).toBe(false);
        expect(mockSetErrors).toHaveBeenCalledWith(
          expect.objectContaining({
            'vipTicket.quantity': 'VIP тасалбарын тоо хэмжээ оруулна уу',
            'vipTicket.price': 'VIP тасалбарын үнэ оруулна уу',
          })
        );
      });

      it('should validate regular ticket', () => {
        const invalidFormData = {
          ...validFormData,
          regularTicket: { quantity: 0, price: 0 },
        };

        const isValid = validateForm(invalidFormData, mockSetErrors);

        expect(isValid).toBe(false);
        expect(mockSetErrors).toHaveBeenCalledWith(
          expect.objectContaining({
            'regularTicket.quantity': 'Regular тасалбарын тоо хэмжээ оруулна уу',
            'regularTicket.price': 'Regular тасалбарын үнэ оруулна уу',
          })
        );
      });

      it('should validate standing area ticket', () => {
        const invalidFormData = {
          ...validFormData,
          standingAreaTicket: { quantity: 0, price: 0 },
        };

        const isValid = validateForm(invalidFormData, mockSetErrors);

        expect(isValid).toBe(false);
        expect(mockSetErrors).toHaveBeenCalledWith(
          expect.objectContaining({
            'standingAreaTicket.quantity': 'Задгай тасалбарын тоо хэмжээ оруулна уу',
            'standingAreaTicket.price': 'Задгай тасалбарын үнэ оруулна уу',
          })
        );
      });

      it('should validate negative ticket values', () => {
        const invalidFormData = {
          ...validFormData,
          vipTicket: { quantity: -1, price: -1 },
        };

        const isValid = validateForm(invalidFormData, mockSetErrors);

        expect(isValid).toBe(false);
        expect(mockSetErrors).toHaveBeenCalledWith(
          expect.objectContaining({
            'vipTicket.quantity': 'VIP тасалбарын тоо хэмжээ оруулна уу',
            'vipTicket.price': 'VIP тасалбарын үнэ оруулна уу',
          })
        );
      });
    });

    it('should validate multiple fields simultaneously', () => {
      const invalidFormData = {
        ...validFormData,
        concertName: '',
        artistName: [],
        vipTicket: { quantity: 0, price: 0 },
      };

      const isValid = validateForm(invalidFormData, mockSetErrors);

      expect(isValid).toBe(false);
      expect(mockSetErrors).toHaveBeenCalledWith(
        expect.objectContaining({
          concertName: 'Тоглолтын нэр оруулна уу',
          artistName: 'Үндсэн артистын нэр оруулна уу',
          'vipTicket.quantity': 'VIP тасалбарын тоо хэмжээ оруулна уу',
          'vipTicket.price': 'VIP тасалбарын үнэ оруулна уу',
        })
      );
    });
  });

  describe('showToasts', () => {
    it('should show success toast when form is valid', () => {
      showToasts(true);

      expect(toast.success).toHaveBeenCalledWith(
        'Тасалбар амжилттай нэмэгдлээ!',
        expect.objectContaining({
          position: 'top-right',
          autoClose: 3000,
        })
      );
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should show error toast when form is invalid', () => {
      showToasts(false);

      expect(toast.error).toHaveBeenCalledWith(
        'Формын мэдээллийг бүрэн оруулна уу!',
        expect.objectContaining({
          position: 'top-right',
          autoClose: 3000,
        })
      );
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});
