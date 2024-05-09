'use client';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.css';

type RichTextProps = {
  onChange: (_value: string) => void;
  helpertext?: string;
  content: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: {} }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

const RichTextEditor = ({ onChange, helpertext, content }: RichTextProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  return (
    <div data-cy="richText-cy-id" className=" flex flex-col gap-[15px]">
      <p className=" text-lg font-semibold">Нийтлэлээ бичих</p>
      <div className=" flex flex-col gap-2" data-testid="quillEditor">
        <ReactQuill
          placeholder="Бичиж эхлэх..."
          theme="snow"
          style={{ display: 'flex', flexDirection: 'column-reverse', gap: '40px' }}
          modules={modules}
          className={styles.quill}
          onChange={onChange}
          value={content}
          data-testid="richTexteditor"
        />
      </div>
      <p data-testid="helperText" className=" text-red-700 text-[16px]">
        {helpertext}
      </p>
    </div>
  );
};
export default RichTextEditor;
