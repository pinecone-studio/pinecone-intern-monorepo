import { MutationFunction } from '@apollo/client';
import { CreatePostSvg } from '../../components/svg/CreatePostSvg';
import { toast } from 'react-toastify';
import { UpdateProfileImageMutation, UpdateProfileImageMutationVariables } from '@/generated';

export const UploadSection = ({ updatePhoto }: { updatePhoto: MutationFunction<UpdateProfileImageMutation, UpdateProfileImageMutationVariables> }) => {
  const handleUploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;

    if (!files?.length) return;

    try {
      const filesArr = Array.from(files);
      const imageUrls = await Promise.all(
        filesArr.map(async (file) => {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'instagram');
          data.append('cloud_name', 'dqxstnqrf');

          const res = await fetch('https://api.cloudinary.com/v1_1/dqxstnqrf/image/upload', {
            method: 'POST',
            body: data,
          });

          if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
          const uploadedImage = await res.json();

          return uploadedImage.secure_url;
        })
      );

      updatePhoto({
        variables: {
          image: imageUrls[0],
        },
      });
      toast.success('success');
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 w-[240px] h-20 mt-4 mb-4 " data-testid="modal-content">
      <label className="flex flex-col items-center gap-4 cursor-pointer" data-testid="upload-label">
        <div className="w-24 h-20 mb-4" data-testid="upload-icon">
          <CreatePostSvg />
        </div>
        <p className="text-xl" data-testid="upload-text"></p>
        <button
          className="bg-[#0095F6] text-sm px-4 py-2.5 text-white rounded-lg hover:bg-[#1877F2] transition-colors cursor-pointer"
          data-testid="select-from-computer-button"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          Upload Pohoto
        </button>
        <input id="file-upload" type="file" accept="image/*,video/*" multiple className="hidden" data-testid="file-upload-input" onChange={handleUploadImages} />
      </label>
    </div>
  );
};
