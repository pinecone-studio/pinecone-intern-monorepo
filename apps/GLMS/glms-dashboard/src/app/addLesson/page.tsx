'use client';

import { SectionButton } from './_components/SectionButton';
import { SectionEntry } from './_components/SectionEntry';
import { SectionSaveButt } from './_components/SectionSaveButt';
import { AddLessonMain } from './_features/AddLessonMain';

export default async function Index() {
  return (
    <div>
      {/* <AddLessonMain /> */}
      <SectionButton />
      <SectionSaveButt />
      <SectionEntry />
    </div>
  );
}
