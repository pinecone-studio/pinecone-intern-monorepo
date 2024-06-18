'use client';
import { ImageInput } from "./_components/ImageInput";

export default async function Index() {
  
  const onImageUplaod = (file: File) => {
    console.log(file);
  }
  return (
    <div>
      <h1 data-cy="Articles-Page">hello from Articles Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <ImageInput onImageUpload={onImageUplaod}/>
    </div>
  );
}
