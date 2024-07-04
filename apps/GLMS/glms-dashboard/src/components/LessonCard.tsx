import Link from 'next/link';

interface LessonCardProps {
  title: string | undefined;
  id: string | undefined;
  href: string;
}

export const LessonCard = ({ title, href }: LessonCardProps) => {
  return (
    <Link href={href}>
      <div className="bg-gray-50 w-full rounded-[12px] hover:bg-gray-100 border-[1px] border-gray-300 flex w-custom px-8 py-6 items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
    </Link>
  );
};