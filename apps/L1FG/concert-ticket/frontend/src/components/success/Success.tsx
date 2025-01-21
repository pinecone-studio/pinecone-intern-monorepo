import React from 'react';

interface SuccessMessageProps {
  message?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message = 'Амжилттай үүсгэлээ.' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/95">
      <div
        className="border border-[#27272A] rounded-2xl w-[446px] h-[276px] flex flex-col items-center justify-center gap-6"
        style={{
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center"
          style={{
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="text-white text-lg font-normal">{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
