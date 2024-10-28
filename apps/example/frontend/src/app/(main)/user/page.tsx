"use client"
import { OrderHistory, UserSection } from "@/components";
import { Container } from "@/components/assets";
import { useState } from "react";

export default function UserInfo() {
    const [chooseTable, setChooseTable] = useState<boolean>(true)
    return (
        <Container>
            <div className='flex w-fit m-auto gap-5 pt-12'>
                <div className='w-60 space-y-1 text-sm'>
                    <button onClick={() => setChooseTable(true)} className={`px-4 py-2 w-full rounded-full text-start hover:bg-gray-50 ${chooseTable ? 'bg-gray-200' : null}`}>Хэрэглэгчийн хэсэг</button>
                    <button onClick={() => setChooseTable(false)} className={`px-4 py-2 w-full rounded-full text-start hover:bg-gray-50 ${!chooseTable ? 'bg-gray-200' : null}`}>Захиалгын түүх</button>
                </div>
                <div className='w-[620px]'>{chooseTable ? (<UserSection />) : (<OrderHistory />)}</div>
            </div>
        </Container>
    )
}