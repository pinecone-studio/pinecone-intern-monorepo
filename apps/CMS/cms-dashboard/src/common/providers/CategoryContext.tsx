import { createContext, useState, useContext, ReactNode } from 'react';

type Category = string;

interface SelectedCategoriesContextProps {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const SelectedCategoriesContext = createContext<SelectedCategoriesContextProps | undefined>(undefined);

export const SelectedCategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  return (
    <SelectedCategoriesContext.Provider value={{ selectedCategories, setSelectedCategories }}>
      {children}
    </SelectedCategoriesContext.Provider>
  );
};

export const useSelectedCategories = (): SelectedCategoriesContextProps => {
  const context = useContext(SelectedCategoriesContext);
  if (!context) {
    throw new Error('useSelectedCategories must be used within a SelectedCategoriesProvider');
  }
  return context;
};
