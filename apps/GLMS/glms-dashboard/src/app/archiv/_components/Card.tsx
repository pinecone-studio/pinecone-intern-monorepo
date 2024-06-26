import * as React from "react"
import { Course } from '@/generated';
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

export function CardWithForm(props: Course) {
    const { id, thumbnail, title, content } = props;
    return (
        <div className="flex gap-4">
                <Card data-testid="test-card" key={id} className="w-[282px] flex flex-col mt-3">
                    <div className="h-1/2 w-100% cover">
                        <img data-testid="lessonImage" src={thumbnail}/>
                    </div>
                    <div className="flex flex-col px-4 mt-1 pb-5">
                        <CardTitle data-testid="lessonTile"  className="font-semibold text-base">{title}</CardTitle>
                        <CardDescription data-testid="lessonDesc" className="mt-1 text-sm">{content}</CardDescription>
                        <Badge data-testid="lessonCount" className="bg-[#C1E6CF] text-[#0A4E22] w-[100px] flex justify-center  text-center font-light text-base mt-1">lessons</Badge>
                    </div>
                </Card>
        </div>
    )
}