'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import Alert from '../alert/Alert';

interface AlertData {
  type: 'success' | 'error' | 'warning';
  message: string;
}

interface AlertContextType {
  showAlert: (_type: 'success' | 'error' | 'warning', _message: string) => void;
}

const AlertContext = createContext<AlertContextType>({
  showAlert: () => {
    console.warn('showAlert method not implemented');
  },
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
