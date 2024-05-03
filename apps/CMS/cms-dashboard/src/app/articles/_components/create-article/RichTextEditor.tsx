'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.css';

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

type RichTextProps = {
  content: string;
  onChange: (_value: string) => void;
};
const RichTextEditor = (props: RichTextProps) => {
  const { content, onChange } = props;
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

  return (
    <div className=" flex flex-col gap-[15px]">
      <p className=" text-lg font-semibold">Нийтлэлээ бичих</p>
      <div data-testid="quillEditor">
        <ReactQuill
          placeholder="Бичиж эхлэх..."
          theme="snow"
          style={{ display: 'flex', flexDirection: 'column-reverse', gap: '40px' }}
          modules={modules}
          className={styles.quill}
          value={content}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
export default RichTextEditor;
