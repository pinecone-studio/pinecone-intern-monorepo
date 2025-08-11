"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePost } from "@/components/context/PostContext";
import { ImagePlus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousels";
const CreatePost = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { postStep, setPostStep } = usePost();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files).slice(0, 10);
    const newImages: string[] = [];
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          if (newImages.length === fileArray.length) {
            setSelectedImages(newImages);
            setPostStep("preview");
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleNext = () => {
    if (currentIndex < selectedImages.length - 1) setCurrentIndex((p) => p + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

  const handleShare = () => {
    alert(
      `Post created!\nCaption: ${caption}\nImages: ${selectedImages.length}`
    );
    setPostStep("idle");
    setSelectedImages([]);
    setCaption("");
    setCurrentIndex(0);
  };
  const wordCount = caption.trim() === "" ? 0 : caption.trim().split(/\s+/).length;
  const maxWords = 2200;
  return (
    <div className="m-[80px_0px_0px_536px] ">
      {postStep !== "idle" && (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0"></div>

          <div className="fixed bg-white rounded-xl pt-[8px] pb-[24px]  z-50 mt-[120px] ml-[80px]">
            {postStep === "select-image" && (
              <div className="flex flex-col w-[638px] h-[678px] items-center gap-[196px] p-[8px_0_48px_0]">
                <h2 className="text-[16px] font-normal text-center border-b w-full pb-2">
                  Create New Post
                </h2>
                <div className="h-[175px] rounded-lg p-8 text-center flex flex-col items-center justify-center">
                  <input
                    type="file"
                    data-cy="image-upload"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center h-full"
                  >
                    <Image src="/filedrop.svg" alt="Upload Icon" width={96} height={77} />
                    <p className="mt-2 text-[20px] font-[400]">Drag photos and videos here</p>
                  </label>
                  <Button
                    variant="outline"
                    className="mt-2 bg-blue-400 w-[178px] h-[40px] p-[8px_16px] hover:bg-blue-500 text-white"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    Select from computer
                  </Button>
                </div>
              </div>
            )}
            {postStep === "preview" && selectedImages.length > 0 && (
              <div className="flex flex-col w-[638px] h-[678px] items-center">
                <div className="flex justify-between items-center w-full px-4 mb-4">
                  <Button variant="outline" onClick={() => setPostStep("select-image")}>
                    <ArrowLeft />
                  </Button>
                  <h2 className="text-[16px] font-bold">Preview</h2>
                  <p
                    className="text-blue-600 cursor-pointer text-[14px] font-bold"
                    onClick={() => setPostStep("add-caption")}
                  >
                    Next
                  </p>
                </div>
                <ImageCarousel
                  selectedImages={selectedImages}
                  currentIndex={currentIndex}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              </div>
            )}
            {postStep === "add-caption" && selectedImages.length > 0 && (
              <div className="w-[997px] h-[679px] flex flex-col">
                <div className="flex justify-between items-center w-full px-4 mb-4">
                  <Button variant="outline" onClick={() => setPostStep("preview")}>
                    <ArrowLeft />
                  </Button>
                  <h2 className="text-[16px] font-bold">Create new post</h2>
                  <p className="text-blue-600 cursor-pointer text-[14px] font-bold" onClick={handleShare}> Share </p>
                </div>
                <div className="items-center h-[638px] flex gap-[16px]">
                  <div className="w-[638px] h-[638px]">
                    <ImageCarousel
                      selectedImages={selectedImages}
                      currentIndex={currentIndex}
                      handleNext={handleNext}
                      handlePrev={handlePrev}
                    />
                  </div>
                  <div className="w-[343px] h-[638px] p-[8px_0]">
                    <div className="w-[343px] h-[232px] flex flex-col gap-[8px] border-b border-b-gray-100 border-t">
                      <div className="w-full flex justify-between h-[40px] items-center pt-2">
                        <div className="flex justify-center items-center gap-2">
                          <div className="w-[14px] h-[14px] rounded-full bg-slate-300"></div>
                          <h1>Oyunbat</h1>
                        </div>
                      </div>
                      <textarea
                        value={caption}
                        data-cy="caption-input"
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                        className="w-[327px] h-[132px] border rounded-md p-[8px_12px]"
                      />
                      <div className="flex justify-between h-[44px] w-[343px] text-sm text-gray-500">
                        <div>{wordCount} {wordCount === 1 ? "word" : "words"} </div>
                        <div className="pr-[16px]">{wordCount > maxWords ? "Limit exceeded" : `${wordCount}/${maxWords}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          </>
      )}
    </div>
  );
};

export default CreatePost;