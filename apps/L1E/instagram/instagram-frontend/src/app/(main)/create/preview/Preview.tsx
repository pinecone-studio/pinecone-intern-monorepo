"use client"

import { useState } from "react";
  import { usePost } from "@/components/context/PostContext";
  import {ArrowLeft } from "lucide-react";
  import ImageCarousel from "@/components/ImageCarousels";

                  
type PreviewProps = {
  selectedImages: string[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  onAddImageClick: () => void;
  setSelectedImages:  (_images: string[]) => void;
  setCaption: (_caption: string) => void;
};

const Preview = ({
  selectedImages,
  currentIndex,
  handleNext,
  handlePrev,
  setSelectedImages,
  setCaption,

}: PreviewProps) => {
  
        const { postStep, setPostStep } = usePost();
        const [showDiscardDialog, setShowDiscardDialog] = useState(false);
        const handleAddImageClick = () => {
  const input = document.getElementById("global-image-input") as HTMLInputElement;
  if (input) {
    input.value = ''; 
    input.click();
  }
};

              const discard = () => {
        setShowDiscardDialog(true);
      };
  return <div>
                    <div className="flex flex-col w-[638px] h-[679px] items-center">
                  <div className="flex flex-col justify-between items-center w-full h-[41px] pt-2">
                <div className="h-[24px] flex justify-between items-center w-[638px] p-[0px_8px]">             
                    <ArrowLeft data-cy="back-icon" onClick={() => discard()}  className="h-[16px] w-[16px]" />
                    <h2 className="text-[16px] font-bold">Preview</h2>
                    <p
                      className="text-blue-600 cursor-pointer text-[14px] font-bold"
                      onClick={() => setPostStep("add-caption")}
                    >
                      Next
                    </p>
                    </div>
                    <hr />
                  </div>
                    <div >
                      <ImageCarousel
                    selectedImages={selectedImages}
                    currentIndex={currentIndex}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    postStep={postStep}
                   onAddImageClick={ handleAddImageClick}
                  />
                
                    </div>
                </div>
                              {showDiscardDialog && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
    <div className="bg-white rounded-xl   flex flex-col gap-[16px] w-[324px] h-[156px] p-[24px]">
              <div className="flex flex-col gap-[8px] items-start">
                 <h2 className="text-[18px] font-[600]">Discard post?</h2>
                  <p className="text-gray-600 text-[14px] font-[400]">If you leave, your edits won&apos;t be saved.</p>
              </div>
      <div className="flex  justify-end w-[276px] h-[36px] gap-[8px]">
        <button
          className="flex items-center  justify-center rounded-md shadow-sm border border-solid border-[#E4E4E7] bg-white hover:bg-gray-200 h-[36px] p-[8px_16px]"
          onClick={() => setShowDiscardDialog(false)}
        >
          Cancel
        </button>
        <button
          className="flex items-center  justify-center rounded-md shadow-sm border border-solid text-red-600 border-[#E4E4E7] bg-white hover:bg-gray-200 h-[36px] p-[8px_16px]"
          onClick={() => {
            setShowDiscardDialog(false);
            setPostStep("idle");
            setSelectedImages([]);
            setCaption("");
          }}
        >
          Discard
        </button>
      </div>
    </div>
  </div>
)}
  </div>;
};

export default Preview;