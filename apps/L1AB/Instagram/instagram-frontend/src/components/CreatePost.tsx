/* eslint-disable complexity */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import { useState, useContext } from 'react';
import CreatePostCancelButton from './CreatePostCancelButton';
import { UserContext } from './providers';
import Image from 'next/image';
import { useCreatePostMutation, useGetPostsByFollowersIdQuery } from '@/generated';
import UploadStep from './CreatePostUpload';
import CreatePostDescription from './CreatePostDescription';

type CreatePostProps = {
  isDialogOpen: boolean;
  onOpenChange: () => void;
};

export const CreatePost: React.FC<CreatePostProps> = ({ isDialogOpen, onOpenChange }) => {
  const [createPost] = useCreatePostMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [caption, setCaption] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'upload' | 'description'>('upload');
  const { user }: any = useContext(UserContext);
  const { refetch } = useGetPostsByFollowersIdQuery({
    variables: {
      followerId: user ? user._id : '',
    },
  });
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

      const urls: string[] = [];
      setIsUploading(true);
      try {
        for (const file of fileArray) {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'ig-cloudinary');
          data.append('cloud_name', 'doqzizxvi');

          const res = await fetch('https://api.cloudinary.com/v1_1/doqzizxvi/image/upload', {
            method: 'POST',
            body: data,
          });

          if (!res.ok) {
            throw new Error('Failed to upload image');
          }

          const uploadedImage = await res.json();
          urls.push(uploadedImage.secure_url);
        }
        setImageUrls((prevUrls) => [...prevUrls, ...urls]);
      } catch (error) {
        console.error('Error uploading images:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNext = () => {
    if (selectedFiles.length > 0) {
      setCurrentStep('description');
    }
  };

  const handleStepChange = async () => {
    if (currentStep === 'upload') {
      handleNext();
    } else if (currentStep === 'description') {
      const { data } = await createPost({
        variables: { input: { userId: user._id, images: imageUrls, caption } },
      });
      if (data) {
        refetch();
        resetState();
        onOpenChange();
      }
    }
  };

  const handleBack = () => {
    setCurrentStep('upload');
  };

  const resetState = () => {
    setSelectedFiles([]);
    setImageUrls([]);
    setCaption('');
    setCurrentStep('upload');
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent data-cy="modal-create-post" className={currentStep === 'upload' ? 'max-w-[600px] h-[600px]' : 'max-w-[800px] h-[600px] flex'}>
        <DialogHeader className={`border-b-gray border-b-2 h-12 absolute top-0 left-0 rounded-t-lg transition-width ${currentStep === 'upload' ? 'w-[599px]' : 'w-[798px]'}`}>
          <DialogTitle className="flex justify-between items-center my-1 px-4">
            <CreatePostCancelButton
              onOpenChange={() => {
                resetState();
                onOpenChange();
              }}
            />
            <p>Create new post</p>
            <button onClick={handleStepChange} data-cy="next-button" className="text-blue-500 dark:bg-black bg-white w-10 h-10 z-10 mr-2" disabled={isUploading || imageUrls.length === 0}>
              {currentStep === 'upload' ? 'Next' : 'Share'}
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center flex-col justify-end my-4 gap-4">
          {currentStep === 'upload' ? (
            <UploadStep
              isUploading={isUploading}
              onFileSelect={() => document.getElementById('fileInput')?.click()}
              selectedFiles={selectedFiles}
              onFileChange={handleFileChange}
              onFileRemove={handleFileRemove}
            />
          ) : (
            <div className="flex w-[780px] h-[551px] absolute top-[48px] -left-[1px]">
              <div className="w-2/3 h-full flex items-center justify-center ">
                <div className="w-full h-full">
                  <Image src={URL.createObjectURL(selectedFiles[0])} alt={'no'} className="w-full h-full object-cover rounded-bl-lg" width={780} height={551} />
                </div>
              </div>
              <CreatePostDescription caption={caption} setCaption={setCaption} />
              <button className="absolute bottom-4 left-4 text-blue-500" onClick={handleBack}>
                <ArrowLeft />
              </button>
            </div>
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
