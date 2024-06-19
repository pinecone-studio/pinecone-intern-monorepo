import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BearState {
  firstName: string;
  lastName: string;
  studentCode: string;
  profileImgUrl: string;
  classId: string;
  phoneNumber: string;
  email: string;
  active: boolean;

  setFirstName: (by: string) => void;
  setLastName: (by: string) => void;
  setStudentCode: (by: string) => void;
  setProfileImgUrl: (by: string) => void;
  setClassId: (by: string) => void;
  setPhoneNumber: (by: string) => void;
  setEmail: (by: string) => void;
  setActive: (by: boolean) => void;
}

export const useAddStudent = create<BearState>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      studentCode: '',
      profileImgUrl: '',
      classId: '',
      phoneNumber: '',
      email: '',
      active: false,
      setFirstName: (newValue: string) => set(() => ({ firstName: newValue })),
      setLastName: (newValue: string) => set(() => ({ lastName: newValue })),
      setStudentCode: (newValue: string) => set(() => ({ studentCode: newValue })),
      setProfileImgUrl: (newValue: string) => set(() => ({ profileImgUrl: newValue })),
      setClassId: (newValue: string) => set(() => ({ classId: newValue })),
      setPhoneNumber: (newValue: string) => set(() => ({ phoneNumber: newValue })),
      setEmail: (newValue: string) => set(() => ({ email: newValue })),
      setActive: (newValue: boolean) => set(() => ({ active: newValue })),
    }),

    {
      name: 'add-student',
    }
  )
);
