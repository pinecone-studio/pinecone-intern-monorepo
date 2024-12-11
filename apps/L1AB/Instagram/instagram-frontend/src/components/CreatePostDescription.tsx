'use client';
import { useContext, useState } from 'react';
import { UserContext } from './providers';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Dispatch, SetStateAction } from 'react';

interface User {
  username: string;
  fullname: string;
  profilePicture?: string;
}

interface CreatePostDescription {
  user: User | null;
}

type CreatePostDescriptionProps = {
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
};

const CreatePostDescription = ({ caption, setCaption }: CreatePostDescriptionProps) => {
  const { user }: any = useContext(UserContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const maxLength = 2200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const handleEmojiClick = (emoji: string) => {
    const textarea = document.getElementById('captionTextarea') as HTMLTextAreaElement;
    const cursorPos = textarea.selectionStart;
    const newCaption = caption.slice(0, cursorPos) + emoji + caption.slice(cursorPos);
    setCaption(newCaption);
    setShowEmojiPicker(false)
  };

  const emojiList = ["😄", "😂", "🤣", "😆", "😅", "😍", "😎", "🥰", "❤️", "👍"];

  if (!user) {
    return <div>Please log in to create a post.</div>;
  }

  return (
    <div className="w-1/3 h-full flex justify-start items-start bg-white">
      <div className="h-40% border-b border-gray-300 w-full ml-2 p-1 mt-5 flex flex-col gap-4">
        <div className="flex flex-col w-[326px]" data-cy="RightSideBar">
          <div className="flex w-full h-[56px] justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profilePicture as string} alt={user.username} />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold" data-testid="username">
                  {user.username}
                </h3>
                <h4>{user.fullname}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea 
            id="captionTextarea"
            data-cy="write-description"
            className="w-full h-[140px] border rounded-xl text-sm resize-none p-2"
            placeholder="Write a caption..."
            value={caption}
            onChange={handleChange}
            maxLength={maxLength} 
          />
    
   
          {showEmojiPicker && (
            <div className="absolute bottom-full bg-white p-2 top-16 h-fit rounded-lg shadow-lg border">
              <div className="grid grid-cols-5 gap-2">
                {emojiList.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="text-xl"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mb-4 text-gray-400">
<button
            type="button"
            data-testid="emojiButton"
            className=" text-xl"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀
          </button>
<p>
  {caption.length}/{maxLength}
</p>
</div>
      </div>
    </div>
  );
};

export default CreatePostDescription;
