"use client";
import React, { useState, useEffect } from "react";


import { usePost } from "@/components/context/PostContext";
import  Caption  from "./addCaption/Caption";
import SelectImagePage from "./selectImage/SelectImage";
import Preview from "./preview/Preview";

 const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { postStep, setPostStep } = usePost();

  // Handle step transitions when images are added
  useEffect(() => {
    if (postStep === "select-image" && selectedImages.length > 0) {
      setPostStep("preview");
    }
  }, [selectedImages.length, postStep, setPostStep]);

  const handleImageLoad = (files: FileList, newImages: string[]) => {
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        
        // Compress the image before adding to state
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set maximum dimensions
          const maxWidth = 800;
          const maxHeight = 800;
          
          let { width, height } = img;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedImage = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
            newImages.push(compressedImage);
            
            if (newImages.length === files.length) {
              addImagesToState(newImages);
            }
          }
        };
        img.src = e.target.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages: string[] = [];
    handleImageLoad(files, newImages);
    
  };

  const addImagesToState = (newImages: string[]) => {
    setSelectedImages((prev) => {
      const updated = [...prev, ...newImages];
      return updated;
    });
  };

  const handleAddImageClick = () => {
    const input = document.getElementById("global-image-input") as HTMLInputElement;
    if (input) {
      input.value = "";
      input.click();
    }
  };

  const handleNext = () => currentIndex < selectedImages.length - 1 && setCurrentIndex((p) => p + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex((p) => p - 1);

  const renderSelectImage = () => <SelectImagePage />;

  const renderPreview = () => (
    <Preview
      selectedImages={selectedImages}
      currentIndex={currentIndex}
      handleNext={handleNext}
      handlePrev={handlePrev}
      onAddImageClick={handleAddImageClick}
      setSelectedImages={setSelectedImages}
      setCaption={setCaption}
    />
  );

  const renderCaption = () => (
    <Caption
      selectedImages={selectedImages}
      currentIndex={currentIndex}
      handleNext={handleNext}
      handlePrev={handlePrev}
      setSelectedImages={setSelectedImages}
      onAddImageClick={handleAddImageClick}
      postStep={postStep}
      setPostStep={setPostStep}
      caption={caption}
      setCaption={setCaption}
      handleShare={() => {
        console.log("Shared!");
      }}
      loading={false}
    />
  );

const renderModalContent = () => {
  const stepsMap: Record<string, () => React.ReactElement | null> = {
    "select-image": renderSelectImage,
    preview: selectedImages.length > 0 ? renderPreview : () => null,
    "add-caption": selectedImages.length > 0 ? renderCaption : () => null,
  };

  return stepsMap[postStep] ? stepsMap[postStep]() : null;
};


  return (
    <div className="m-[80px_0px_0px_536px]">
      {postStep !== "idle" && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-auto">
              <input
                type="file"
                id="global-image-input"
                data-cy="image-upload"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddImages}
              />
              {renderModalContent()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;