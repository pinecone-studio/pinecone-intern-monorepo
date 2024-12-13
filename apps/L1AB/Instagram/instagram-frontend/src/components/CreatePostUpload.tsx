import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UploadIcon } from './icon/UploadIcon';

interface UploadStepProps {
  onFileSelect: () => void;
  selectedFiles: File[];
  onFileChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (_fileIndex: number) => void;
}

const UploadStep: React.FC<UploadStepProps> = ({ onFileSelect, selectedFiles, onFileChange, onFileRemove }) => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedFiles.length > 0) {
      const newFileUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setFileUrls(newFileUrls);

      return () => {
        newFileUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [selectedFiles]);

  const hasImage = selectedFiles.some((file) => file.type.startsWith('image/'));

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {selectedFiles.length === 0 ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="mt-36">
            <UploadIcon />
          </div>
          <p>Drag photos and videos here</p>
          <button
            data-cy="click-from-computer"
            className="h-8 w-48 p-2 bg-blue-500 border-blue-500 flex items-center rounded-lg justify-center text-white text-md"
            onClick={onFileSelect}
          >
            Select from computer
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={onFileChange}
            data-testid="file-input"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          {fileUrls.slice(0, 1).map((fileUrl, index) => {
            const file = selectedFiles[index];
            return (
              <div key={index} className="relative w-[550px] h-[550px] mt-2">
                {file.type.startsWith('image/') && (
                  <Image
                    src={fileUrl}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                    width={300}
                    height={300}
                  />
                )}

                <div className="absolute bottom-4 left-3 z-20">
                  <button
                    className="bg-red-500 text-white w-9 h-9 rounded-full"
                    onClick={() => onFileRemove(index)} // Remove the file by index
                    aria-label="Delete file"
                  >
                    x
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {hasImage && (
        <button
          className="absolute bottom-4 right-3 text-white bg-gray-900 w-9 h-9 rounded-full z-20 flex items-center justify-center"
          onClick={onFileSelect}
        >
          +
        </button>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={onFileChange}
        data-testid="file-input"
      />
    </div>
  );
};

export default UploadStep;
