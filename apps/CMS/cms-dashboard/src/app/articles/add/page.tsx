'use client';
import { ImageInput } from "@/app/articles/_components/index";
import { useState } from "react";

export default async function Index() {
  const [file, setFile] = useState<File | null>(null);
console.log(file);

  
  return (
    <div>
      <ImageInput setFile={setFile}/>
    </div>
  );
}