import React, { useState, useEffect } from 'react';
import { SectionButton } from '../_components/SectionButton';
import { SectionSaveButt } from '../_components/SectionSaveButt';
import { ArrowLeft } from 'lucide-react';
import { ActionLinkButton } from '@/components/ActionLinkButton';
import { Field } from '@/components/Field';
import { TextareaField } from '@/components/TextareaField';
import { ImageUploadCard } from '@/components/ImageUploadCard';
import { useParams, useRouter } from 'next/navigation';
import { useCreateLessonMutation } from '@/generated';

const CLOUD_NAME = 'dbtqkhmu5';
const UPLOAD_PRESET = 'gbgzau24';

export const SectionMain = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>(Date.now().toString());
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { courseId } = useParams();
  const router = useRouter();

  useEffect(() => {
    setDisabled(!(title.trim() && content.trim()));
  }, [title, content]);

  const fileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (event?.target?.files?.[0]) {
      const selectedFile = event.target.files[0];
      await uploadHandler(selectedFile);
      setInputKey(Date.now().toString());
    }
  };

  const uploadHandler = async (file: File) => {
    setIsLoading(true);
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
          method: 'POST',
          body: data,
        });

        const resJson = await res.json();
        console.log('Uploaded image URL:', resJson.url);

        if (resJson.url) {
          setImageUrl(resJson.url);
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        setError('Error uploading image. Please try again.');
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [createLesson] = useCreateLessonMutation();

  const handelCreateLesson = async () => {
    try {
      await createLesson({
        variables: {
          createInput: {
            courseId: courseId,
            title: title,
            thumbnail: imageUrl,
            content: content,
          },
        },
      });

      router.push(`${courseId}`);
    } catch (error) {
      const message = (error as Error).message;
      setError(message);
    }
  };

  return (
    <div className="mx-auto container gap-2">
      <ActionLinkButton label="Хичээлийн ерөнхий мэдээлэл" Icon={ArrowLeft} href={`/${courseId}`} />

      <div className="bg-white h-[900px] mt-5 flex flex-col gap-3 items-center justify-center rounded-[12px]">
        <h1>Add Lesson for Course {courseId}</h1>

        <Field label="Хичээлийн гарчиг" value={title} dataTestid="lesson-title" onChange={setTitle} />

        <TextareaField label="Дэлгэрэнгүй" placeholder="Энд бичнэ үү..." value={content} dataTestid="lesson-content" onChange={setContent} />

        <ImageUploadCard
          label="Хичээлийн зураг"
          type="file"
          onChange={fileChangeHandler}
          imageUrl={imageUrl}
          key={inputKey}
          dataTestid="lesson-upload-photo"
          UploadedDataTestid="lesson-uploaded-photo"
          isLoading={isLoading}
        />

        {error && (
          <div className="text-red-500" data-testid="error-message">
            {error}
          </div>
        )}

        <div className="pt-[24px] flex flex-col items-center gap-[32px]">
          <SectionButton />
          <div data-testid="save-button">
            <SectionSaveButt disabled={disabled} onClick={handelCreateLesson} />
          </div>
        </div>
      </div>
    </div>
  );
};
