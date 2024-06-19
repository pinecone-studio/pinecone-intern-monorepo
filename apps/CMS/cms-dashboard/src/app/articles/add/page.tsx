'use client';
import { ImageInput } from "@/app/articles/_components/index";

export default async function Index() {
  
  const onImageUpload = (file: File) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log(file);
  };
  
  return (
    <div>
      <ImageInput onImageUpload={onImageUpload}/>
    </div>
  );
}