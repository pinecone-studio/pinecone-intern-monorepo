'use client';
import dynamic from 'next/dynamic';
import {  Dispatch, SetStateAction, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.css'

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
    setContent?: Dispatch<SetStateAction<string>>;
}
const RichTextEditor = (props: RichTextProps) => {
    const {content, setContent} = props;
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

 return (
    <div className=' flex flex-col gap-[15px]'>        
        <p className=' text-lg'>Нийтлэлээ бичих</p>
        <div data-testid="quillEditor" >
            <ReactQuill  placeholder='Бичиж эхлэх...' theme="snow" value={content}  style={{ display: 'flex', flexDirection: 'column-reverse', gap: '40px'}} modules={modules} className={styles.quill} onChange={setContent} />
        </div>
    </div>
  )
}
export default RichTextEditor;
