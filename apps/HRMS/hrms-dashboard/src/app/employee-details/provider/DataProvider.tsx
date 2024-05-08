'use client';
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type DataContextType = {
  filterJob: string;
  filterStatus: string;
  filterSearch: string;
  setFilterJob: Dispatch<SetStateAction<string>>;
  setFilterStatus: Dispatch<SetStateAction<string>>;
  setFilterSearch: Dispatch<SetStateAction<string>>;
};
const DataContext = createContext<DataContextType>({} as DataContextType);
export const DataProvider = ({ children }: PropsWithChildren) => {
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  return (
    <DataContext.Provider value={{ filterJob, filterStatus, setFilterJob, setFilterStatus, filterSearch, setFilterSearch }}>
      {children}
      <ToastContainer />
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
