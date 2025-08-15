"use client";
import React, { useState } from "react";


import { usePost } from "@/components/context/PostContext";
import  Caption  from "./addCaption/Caption";
import SelectImagePage from "./selectImage/SelectImage";
import Preview from "./preview/Preview";

 const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { postStep, setPostStep } = usePost();
  console.log(postStep  , "CHECKKK in CReatePAGE")


  const handleImageLoad = (files: FileList, newImages: string[]) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        newImages.push(e.target.result as string);
        if (newImages.length === files.length) addImagesToState(newImages);
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
      if (postStep === "select-image" && updated.length > 0) setPostStep("preview");
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
      <input
        type="file"
        id="global-image-input"
        data-cy="image-upload"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAddImages}
      />

      {postStep !== "idle" && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0"></div>
          <div className="fixed bg-white rounded-xl z-50 mt-[90px] ml-[210px]">
            {renderModalContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;