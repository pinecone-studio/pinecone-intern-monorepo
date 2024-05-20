'use client';

import { fileManagement } from '@/file-management';
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';

type FormikTypes = {
  name: string;
  setFieldValue: (_: string, _value: string) => void;
  image: string;
};

export const ChallengeFileUploader = (props: FormikTypes) => {
  const [loading, setLoading] = useState(false);
  const { setFieldValue, image, name } = props;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(true);
      const file = Array.from(e.target.files);
      fileManagement(file, 'GLMS-dashboard').then((accessUrl) => {
        setFieldValue(name, accessUrl[0]);
        setLoading(false);
      });
    }
  };

  const handleSetEmptyValue = () => {
    setFieldValue(name, '');
  };

  return (
    <div
      className="w-full h-full px-1 border border-dashed border-gray-300 dashed rounded-lg flex justify-center items-center relative"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', objectFit: 'cover' }}
    >
      {loading && <span data-testid="loading-spinner" className="loading loading-spinner loading-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>}
      {!image && !loading ? (
        <div className="flex flex-col items-center">
          <p className="text-base font-medium text-gray-600">Зургийг чирж буулгах эсвэл</p>
          <div className="w-20 overflow-hidden p-5">
            <label htmlFor="file-test" className="underline text-base font-semibold text-black cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center">
              Browse
            </label>
            <input id="file-test" data-testid="file-upload" onChange={handleUpload} type="file" className="opacity-0 w-full h-full p-0 absolute top-0 left-0" />
          </div>
        </div>
      ) : (
        <button
          data-testid="cancel-btn"
          className="absolute top-2 right-2 w-10 h-10 bg-gray-200 text-white rounded-full flex items-center justify-center hover:bg-gray-600"
          onClick={handleSetEmptyValue}
        >
          <MdCancel />
        </button>
      )}
    </div>
  );
};
