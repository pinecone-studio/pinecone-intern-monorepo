import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SizeIcon from './assests/SizeIcon';
import TotalRoomsIcon from './assests/TotalRoomsIcon';
import RestroomsIcon from './assests/RestroomsIcon';
import TitelIcon from './assests/TitleIcon';

interface PreviewSectionProps {
  formData: any;
  onSubmit: () => Promise<void>;
  isEdit?: boolean;
  initialIndex?: number;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ formData, onSubmit, isEdit = false, initialIndex = 0 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentImageIndex >= formData.images.length) {
      setCurrentImageIndex(0);
    }
  }, [formData.images.length, currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % formData.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + formData.images.length) % formData.images.length);
  };

  const checkNull = (text: string) => text || '0';
  const checkNullReturnString = (text: string) => text || 'Мэдээлэл байхгүй';

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      return isEdit ? 'Шинэчилж байна...' : 'Илгээж болон байна...';
    }
    return isEdit ? 'Зар шинэчлэх' : 'Зар оруулах хүсэлт илгээх';
  };

  const renderImageSection = () => (
    <div className="relative mb-4">
      {formData.images.length > 0 && (
        <>
          <Image src={formData.images[currentImageIndex]} alt={`Uploaded ${currentImageIndex + 1}`} width={528} height={256} className="w-full h-64 object-cover rounded-md shadow-sm" />
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded" data-testid="image-counter" data-cy="image-counter">
            {currentImageIndex + 1}/{formData.images.length}
          </div>
          <button type="button" onClick={handlePrevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" data-cy="prev-image">
            &lt;
          </button>
          <button type="button" onClick={handleNextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" data-cy="next-image">
            &gt;
          </button>
        </>
      )}
    </div>
  );

  const renderDetailsSection = () => (
    <div className="space-y-2">
      <p className="text-lg font-semibold">{formData.price ? formData.price.toLocaleString() : '0'}₮</p>
      <div className="flex items-center space-x-2">
        <TitelIcon />
        <p className="text-sm font-normal text-gray-500">{checkNullReturnString(formData.title)}</p>
      </div>
      <div className="border p-4 rounded-md shadow-sm flex space-x-4">
        <div className="flex items-center space-x-2">
          <SizeIcon />
          <p className="text-lg font-semibold">{checkNull(formData.size)} м²</p>
        </div>
        <div className="flex items-center space-x-2">
          <TotalRoomsIcon />
          <p className="text-lg font-semibold">{checkNull(formData.totalRooms)} өрөө</p>
        </div>
        <div className="flex items-center space-x-2">
          <RestroomsIcon />
          <p className="text-lg font-semibold" data-testid="restrooms-count">
            {checkNull(formData.restrooms)} а.ц.ө
          </p>
        </div>
      </div>
      <textarea
        className="w-full text-sm font-normal text-gray-500 border border-gray-300 rounded p-2"
        style={{ overflowWrap: 'break-word' }}
        readOnly
        value={checkNullReturnString(formData.description)}
      />
    </div>
  );

  return (
    <div className="w-[528px]" data-testid="preview-section">
      <section className="mt-4 mb-4 border-gray-300 rounded">
        <h2 className="text-2xl font-semibold mb-4">Хэрэглэгчдэд харагдах</h2>
        {renderImageSection()}
        {renderDetailsSection()}
      </section>
      <button
        type="button"
        onClick={handleClick}
        disabled={isSubmitting}
        data-cy={isEdit ? 'update-post' : 'submit-post'}
        data-testid="submit-button"
        className={`w-full px-6 py-2 mt-6 text-white rounded-md ${isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default PreviewSection;
