import { Button } from '@/components/ui/button';
import { Room, useRoomQuery } from '@/generated';
import { Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const GeneralInfo = ({ roomId }: { roomId: string }) => {
  const [room, setRoom] = useState<Room | undefined | null>();
  const { data } = useRoomQuery({
    variables: {
      roomId,
    },
  });

  useEffect(() => {
    setRoom(data?.room);
  }, [data]);

  return (
    <div className="max-w-[784px] w-full flex flex-col items-start p-6 rounded-[8px] border ">
      <div className="w-full flex justify-between items-start ">
        <h3 className="text-[18px] font-[600] leading-[28px] ">General Info</h3>
        <Button variant={'ghost'} className="text-[#2563EB] hover:text-[#2563EB] hover:bg-white font-[500] text-[14px] leading-[20px] ">
          Edit
        </Button>
      </div>
      <div className="w-full pb-[24px] mt-[24px] border-t "></div>
      <div className="w-full flex flex-col items-start  gap-[24px] ">
        <div className="flex w-full gap-[32px] items-start ">
          <div className="flex flex-col items-start gap-1 w-full ">
            <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground ">Name</h4>
            <p className="text-[14px] font-[500] leading-[20px] ">{room?.name}</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-full ">
            <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground ">Type</h4>
            <p className="text-[14px] font-[500] leading-[20px] ">{room?.type}</p>
          </div>
          <div className="flex flex-col items-start gap-1 w-full ">
            <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground ">Price per night</h4>
            <p className="text-[14px] font-[500] leading-[20px] ">{room?.pricePerNight}₮</p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground">Room Information</h4>
          <div className="flex w-full items-center gap-8 ">
            <div className="w-full flex flex-wrap items-start gap-3  ">
              <div className="flex max-w-[224px] w-full  gap-2 items-center  ">
                <Zap className="w-4 h-4" />
                <small className="text-[14px] font-[500] leading-[20px] ">{room?.information}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
