"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";

const ImageCarousel = ({
  selectedImages,
  currentIndex,
  handleNext,
  handlePrev,
  postStep,
  onAddImageClick
}: {
  selectedImages: string[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  postStep: string;
  onAddImageClick: () => void;
}) => {
  
  const currentImage = selectedImages?.[currentIndex];

  // if (!currentImage) {
  //   return (
  //     <div className="w-full h-[638px] flex items-center justify-center text-red-500">
  //       No image available at index {currentIndex}
  //     </div>
  //   );
  // }

  return (
    <div className="relative overflow-hidden rounded-b-xl w-[638px] flex items-center justify-center">
      {postStep === "preview" && (
        <div
          onClick={onAddImageClick}
          className="w-[40px] h-[40px] bg-white absolute bottom-[10px] right-[10px] rounded-full flex justify-center items-center"
        >
          <ImagePlus className="w-[16px] h-[16px] text-black" />
        </div>
      )}
      <Image
        src={currentImage}
        alt={`Preview ${currentIndex + 1}`}
        className="w-full h-[638px] object-cover"
        width={638}
        height={638}
      />
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
        >
          ‹
        </button>
      )}
      {currentIndex < selectedImages.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white"
        >
          ›
        </button>
      )}
      <div className="absolute top-2 left-2 text-white px-2 py-1 rounded-md text-sm bg-black/40">
        {currentIndex + 1} / {selectedImages?.length || 0}
      </div>
      <div className="absolute bottom-4 flex gap-1">
        {selectedImages?.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;