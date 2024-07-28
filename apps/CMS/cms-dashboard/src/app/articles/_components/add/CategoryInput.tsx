import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useField } from 'formik';

type Category = string;

interface CategoryInputProps {
  name: string;
  placeholder: string;
  label: string;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({ name, placeholder, label }) => {
  const [categories, setCategories] = useState<Category[]>(['Coding', 'Morphosis', 'Leap', 'Frontend', 'Backend']);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [field, meta, helpers] = useField<Category[]>(name);
  const { value: selectedCategories = [] } = field;
  const { setValue: setSelectedCategories } = helpers;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.category-input-container') === null) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddCategory = () => {
    if (inputValue && !categories.includes(inputValue)) {
      setCategories([...categories, inputValue]);
    }

    if (inputValue && !selectedCategories.includes(inputValue)) {
      setSelectedCategories([...selectedCategories, inputValue]);
    }

    setInputValue('');
  };

  const handleDeleteCategory = (categoryToDelete: Category) => {
    setSelectedCategories(selectedCategories.filter((category) => category !== categoryToDelete));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddCategory();
      setIsDropdownOpen(false);
    }
  };

  const handleCategorySelect = (category: Category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setIsDropdownOpen(false);
    setInputValue('');
  };

  return (
    <div className="category-input-container relative">
      <label htmlFor={name} className="font-semibold text-lg">
        {label}
      </label>
      <div className="flex items-center flex-wrap gap-2 mt-4">
        {selectedCategories.map((category: Category) => (
          <div key={category} className="flex items-center bg-[#eaeaea] rounded-md px-2 py-1">
            <span className="mr-1">{category}</span>
            <button
              type="button"
              onClick={() => handleDeleteCategory(category)}
              className="text-slate-500 ml-2 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          id={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="input text-[#8B8E95] text-base bg-[#F7F7F8] rounded-lg px-6 py-3 flex-grow"
          onFocus={() => setIsDropdownOpen(true)}
        />
      </div>
      {isDropdownOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto">
          {categories
            .filter((category) => !selectedCategories.includes(category))
            .map((category: Category) => (
              <li
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {category}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
