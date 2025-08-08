"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { usePost } from '@/components/context/PostContext';
import Image from 'next/image';
const CreatePost = () => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { postStep, setPostStep } = usePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setPostStep('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    alert(`Post created!\nCaption: ${caption}\nImage: ${selectedImage ? 'Attached' : 'None'}`);
    setPostStep('idle');
    setSelectedImage(null);
    setCaption('');
  };
    return (
        <div className="m-[80px_0px_0px_536px]">
            <h1>Create Post</h1>
                  {postStep !== 'idle' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl pt-[8px] pb-[24px]">
            {postStep === 'select-image' && (
              <div className="flex flex-col  w-[638px] h-[678px] items-center gap-[196px] p-[8px_0px_48px_0px]">
                <h2 className="text-[16px] font-normal text-center border-b w-full pb-2">Create New Post</h2>
                <div className=" h-[175px] rounded-lg p-8 text-center flex flex-col items-center justify-center">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center h-full">
                    <Image src="/filedrop.svg" alt="Upload Icon" width={96} height={77} />
                    <p className="mt-2  text-[20px] font-[400]">Drag photos and videos here</p>
                  </label>
                   
                    <Button variant="outline" className="mt-2 bg-blue-400 w-[178px] h-[40px] p-[8px_16px] hover:bg-blue-500 text-white" onClick={() => document.getElementById('image-upload')?.click()}>
                      <label htmlFor="image-upload" className="cursor-pointer text-white">
                        Select from computer
                      </label>
                    </Button>
                </div>
               
              </div>
            )}

            {postStep === 'preview' && selectedImage && (
              <div className="flex flex-col  w-[638px] h-[678px] items-center">
                <div className='flex justify-between items-center w-full px-4 mb-4'>
                     <Button variant="outline" onClick={() => setPostStep('idle')}>
                  Cancel
                </Button>
                <h2 className="text-xl font-bold">Crop</h2>
                <p className='text-blue-600' onClick={() => setPostStep('add-caption')}>next</p>
                 
                </div>
              
                  <div className="overflow-hidden rounded-md bg-red-200 w-full h-full">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                 
              </div>
            )}

            {postStep === 'add-caption' && selectedImage && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Add Caption</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 overflow-hidden rounded-md">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative flex-1">
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                      className="w-full p-2 border rounded-md min-h-[100px]"
                    />
                    {/* <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-2 bottom-2 text-gray-500 hover:text-gray-700"
                    >
                      <Smile className="h-5 w-5" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute right-0 bottom-10 z-10">
                        <EmojiPicker
                          onEmojiClick={(emojiData) => {
                            setCaption(prev => prev + emojiData.emoji);
                            setShowEmojiPicker(false);
                          }}
                        />
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setPostStep('select-image')}>
                    Back
                  </Button>
                  <Button onClick={handleShare}>
                    Share
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
        </div>
    );
};

export default CreatePost;
