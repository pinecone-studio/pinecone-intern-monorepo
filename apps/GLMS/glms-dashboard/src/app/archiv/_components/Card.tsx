import * as React from "react"
import { Course } from '@/generated';
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { useQuery, gql } from '@apollo/client';

const GET_COURSES = gql`
    query GetCourses {
        getCourses {
            id
            title
            thumbnail
            content
        }
    }
`;

export function CardWithForm() {
    const { loading, error, data } = useQuery(GET_COURSES); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { getCourses: courses } = data;
    return (
        <div className="flex gap-4 w-10/12 mx-auto">
            {courses.map((course: Course) => (
                <Card data-testid="test-card" key={course.id} className="w-[282px] flex flex-col mt-3">
                    <div className="h-1/2 w-100% cover">
                        <img data-testid="lessonImage" src="js.png" />
                    </div>
                    <div className="flex flex-col px-4 mt-1 pb-5">
                        <CardTitle data-testid="lessonTile" className="font-semibold text-base">{course.title}</CardTitle>
                        <CardDescription data-testid="lessonDesc" className="mt-1 text-sm">{course.content}</CardDescription>
                        <Badge data-testid="lessonCount" className="bg-[#C1E6CF] text-[#0A4E22] w-[100px] flex justify-center  text-center font-light text-base mt-1">lessons</Badge>
                    </div>
                </Card>
            ))}
        </div>
    );
}