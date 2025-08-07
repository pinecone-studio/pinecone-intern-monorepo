"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Home,Search,  AlignJustify, Heart, PlusSquare ,ImagePlus ,BookOpenCheck , Smile} from 'lucide-react';
import { Button } from "@/components/ui/button"

const CreatePost = () => {
  const [postStep, setPostStep] = useState<'idle' | 'select-image' | 'add-caption'>('idle');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setPostStep('add-caption');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostClick = () => {
    setPostStep('select-image');
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
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {postStep === 'select-image' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Create New Post</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <PlusSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 font-medium">Select photos from your computer</p>
                  </label>
                </div>
                <Button variant="outline" onClick={() => setPostStep('idle')}>
                  Cancel
                </Button>
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
