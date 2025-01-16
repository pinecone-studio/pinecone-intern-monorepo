/* eslint-disable max-lines */
/* eslint-disable complexity */
import { useState, useRef, useEffect } from 'react';
import { Match, useAddMessageMutation, useUnMatchMutation } from '@/generated';
import { Image, Send } from 'lucide-react';

import { ProfileCarouselUser } from './ProfileCarousel';
import GetChat from './GetChat';
import { toast } from 'react-toastify';

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

type MatchesProps = {
  matches: Match[];
  targetUser: any;
  userone: any;
  currentMatch: any;
  data1: any;
};
const ChatInterface: React.FC<MatchesProps> = ({ matches, targetUser, userone, data1, currentMatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnmatchModalOpen, setIsUnmatchModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [AddMessageMutation] = useAddMessageMutation();
  const handleProfileClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };
  const [untmatch] = useUnMatchMutation();
  const handleUnmatch = async () => {
    await untmatch({
      variables: {
        authId: targetUser?._id,
      },
    });
    setIsUnmatchModalOpen(false);
  };

  const uploadImageToCloudinary = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) {
      toast.error('Please enter a message or select an image before sending.');
      return;
    }

    let images: string[] = [];

    if (selectedImage) {
      const uploadedImageUrl = await uploadImageToCloudinary(selectedImage);
      images = [uploadedImageUrl];
      setSelectedImage(null);
    }

    await AddMessageMutation({
      variables: {
        input: {
          receiverId: targetUser?._id || '',
          senderId: userone?._id || '',
          content: message,
          images,
        },
      },
    });

    setMessage('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <div className="flex flex-col h-full border-l-[1px] border-[#4e4e7] justify-between">
      <div className="flex max-w-[960px] justify-between items-center border-b-[1px] p-4 border-[#4e4e7] w-screen">
        <div className="flex gap-4">
          <img src={targetUser?.images[0]} className="w-[50px] h-[50px] rounded-full object-cover border-2 border-gray-300" />
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h2 className="text-lg font-semibold">{targetUser?.username}</h2>
              <div className="text-lg font-semibold">{targetUser?.age}</div>
            </div>
            <div className="text-sm text-gray-500">{targetUser?.profession}</div>
          </div>
        </div>
        <div className="flex w-[217px] gap-3 h-[40px]">
          <button data-testid="view" className="w-[117px] py-2 border-[1px] rounded-[4px] border-gray-200" onClick={handleProfileClick}>
            View profile
          </button>
          <button data-testid="unmatch" onClick={() => setIsUnmatchModalOpen(true)} className="w-[117px] py-2 px-4 border-[1px] rounded-[4px] border-gray-200">
            Unmatch
          </button>
        </div>
      </div>
      <GetChat data1={data1} sender={currentMatch?.userId?._id || ''} />
      <div className="flex max-w-[960px] gap-4 px-6 py-5 w-screen">
        <input className="rounded-[12px] border-[1px] border-gray-200 w-[800px] p-2" data-testid="input" placeholder="Say something nice" value={message} onChange={handleInputChange} />
        {selectedImage && (
          <div className="flex items-center justify-center">
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-[40px] h-[40px] rounded-lg border border-gray-300" />
          </div>
        )}
        <label className="flex items-center cursor-pointer">
          <Image className="w-6 h-6 text-gray-500" />
          <input type="file" data-testid="handleImageChange" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        <button data-testid="send" className="flex items-center w-[91px] h-[40px] bg-[#e11d48] text-white justify-center gap-2 rounded-full" onClick={handleSendMessage}>
          <Send className="w-4 h-4" />
          <div className="text-sm">Send</div>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div ref={modalRef} role="dialog" aria-labelledby="modal-title" aria-hidden={!isModalOpen}>
            <ProfileCarouselUser handleCloseModal={handleCloseModal} matches={matches} />
          </div>
        </div>
      )}
      {isUnmatchModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Unmatch this person?</h2>
            <div className="">if you unmatch, you won’t be able to chat with this person again. This action cannot be undone.</div>
            <div className="flex justify-end gap-4 mt-4">
              <button className="px-4 py-2  border-black border-[1px] text-gray-800 rounded-full" onClick={() => setIsUnmatchModalOpen(false)}>
                Keep match
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-full" onClick={handleUnmatch}>
                Unmatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
