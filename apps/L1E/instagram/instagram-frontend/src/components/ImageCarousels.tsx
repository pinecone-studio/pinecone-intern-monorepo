"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePost } from "@/components/context/PostContext";
import { ImagePlus, ArrowLeft } from "lucide-react";
import Image from "next/image";

const ImageCarousel = ({
  selectedImages,
  currentIndex,
  handleNext,
  handlePrev,
}: {
  selectedImages: string[];
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}) => (
  <div className="relative overflow-hidden rounded-md w-full h-full flex items-center justify-center">
    <img
      src={selectedImages[currentIndex]}
      alt={`Preview ${currentIndex + 1}`}
      className="w-full h-full object-cover"
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
      {currentIndex + 1} / {selectedImages.length}
    </div>
    <div className="absolute bottom-4 flex gap-1">
      {selectedImages.map((_, idx) => (
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

export default ImageCarousel;