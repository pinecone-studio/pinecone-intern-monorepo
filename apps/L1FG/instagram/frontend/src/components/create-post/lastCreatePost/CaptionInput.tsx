import React from 'react';
import { SmileIcon } from 'lucide-react';

interface CaptionInputProps {
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
}

const CaptionInput: React.FC<CaptionInputProps> = ({ caption, setCaption }) => {
  return (
    <div className="flex-1">
      <textarea
        className="w-full h-32 border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a caption..."
        maxLength={200}
        value={caption}
        onChange={(e) => setCaption(e.target.value)} // Caption орлуулах
        data-testid="caption-input"
      />
      <div className="flex justify-between items-center py-2 border-b" data-testid="caption-length">
        <SmileIcon className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-500">{caption.length}/200</span>
      </div>
    </div>
  );
};

export default CaptionInput;
