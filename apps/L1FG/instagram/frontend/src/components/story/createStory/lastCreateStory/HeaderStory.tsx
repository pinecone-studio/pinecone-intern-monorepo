import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  // handleBack: () => void;
  handleCreatePost: () => void;
  loadingPost: boolean;
}

const HeaderStory: React.FC<HeaderProps> = ({ /*handleBack*/ handleCreatePost, loadingPost }) => {
  return (
    <div className="flex w-[423px] h-[41px]  justify-between items-center px-4 py-2 border-b" data-testid="modal-header-story">
      <button /*onClick={handleBack}*/ data-testid="back-button-story">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <span className="font-semibold text-base" data-testid="create-header-text-story">
        Create
      </span>
      <button className="text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50" onClick={handleCreatePost} disabled={loadingPost} data-testid="share-button-story">
        {loadingPost ? 'Sharing...' : 'Share'}
      </button>
    </div>
  );
};

export default HeaderStory;
