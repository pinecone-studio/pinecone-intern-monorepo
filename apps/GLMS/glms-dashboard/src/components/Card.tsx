import * as React from "react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

const cardData = [
    {
        title: 'Java Script',
        description: 'Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон',
        image: 'js.png',
        lessonsCount: 5,
    },
    {
        title: 'CSS',
        description: 'Компьютер хэрхэн ажилладаг болон компьютерын шинжлэх уха',
        image: 'css.png',
        lessonsCount: 5,
    },
    {
        title: 'HTML',
        description: 'Сайтын загвар угсрах үндсэн суурь хэлнүүд бөгөөд бүрэн static болон',
        image: 'html.png',
        lessonsCount: 5,
    }
]

export function CardWithForm() {
    return (
        <div className="flex gap-4">
            {cardData.map((card) => (
                <Card className="w-[282px] flex flex-col mt-3">
                    <div className="h-1/2 w-100% cover">
                        <img src={card.image} alt="" />
                    </div>
                    <div className="flex flex-col px-4 mt-1 pb-5">
                        <CardTitle className="font-semibold text-base">{card.title}</CardTitle>
                        <CardDescription className="mt-1 text-sm">{card.description}</CardDescription>
                        <Badge className="bg-[#C1E6CF] text-[#0A4E22] w-[100px] flex justify-center  text-center font-light text-base mt-1">{card.lessonsCount} lessons</Badge>
                    </div>
                </Card>
            ))}
        </div>
    )
}