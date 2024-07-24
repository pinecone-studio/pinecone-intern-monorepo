/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Card } from "./ui/card"
import { NotebookPen } from 'lucide-react';


interface QuizCardPropsTypes{
    href: string,
    title: string
}

export const QuizCard = ({ title, href }: QuizCardPropsTypes) => {
    return (
<Link href={href}>
    <Card className="bg-purple-100 border-dashed w-full rounded-[5px] border-[3px] flex border-purple-500 w-custom px-8 py-6 items-center gap-2 hover:bg-purple-200 hover:border-purple-500 text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out">
        <NotebookPen />
        <h1 className="text-lg font-semibold w-full h-full">{title}'s quiz</h1>
    </Card>
</Link>

    );
  };