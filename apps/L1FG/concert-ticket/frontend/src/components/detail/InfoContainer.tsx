'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetConcertQuery } from '@/generated';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAlert } from '../providers/AlertProvider';

type infoProps = {
  ticketID: string;
};
const InfoContainer = ({ ticketID }: infoProps) => {
  const { data } = useGetConcertQuery({ variables: { id: ticketID as string } });
  const [user, setUser] = useState<string | null>('');
  const formatDate = data?.getConcert.concertDay ? format(data?.getConcert.concertDay, 'yyyy-MM-dd') : '';
  useEffect(() => {
    const getUser = localStorage.getItem('user');
    setUser(getUser);
  }, []);

  const { showAlert } = useAlert();
  const router = useRouter();
  const ticketReservation = () => {
    if (!user) return showAlert('warning', 'Тасалбар захиалахын тулд мэйлээрээ нэвтэрч орно уу'), router.push('/signin');
    return router.push(`/ticketReservation/${ticketID}`);
  };
  return (
    <div className="flex mx-auto w-[1250px] mt-[60px]">
      <div className="flex-1 w-[566px] ">
        <div className="flex justify-between">
          <div className="flex w-[280px] h-[20px] items-center">
            <img className="w-[16px] h-[16px]" src="/calendar.svg" />
            <p className="mx-3 text-white w-[172px]">{formatDate}</p>
            <img className="w-[16px] h-[16px]" src="/time.svg" />
            <p className="mx-3 text-white w-[50px]">{data?.getConcert.concertTime}</p>
          </div>
          <div className="flex">
            <img src="/location.svg" />
            <p className="mx-3 text-white border-b-2">UG ARENA</p>
          </div>
        </div>
        <div>
          <p className="mx-3 text-[#ced5e0] text-[14px] mb-[10px] mt-[30px]">Special Artist</p>
          <div className="ml-[15px]" data-testid="info-container-concert-name">
            {data?.getConcert.artistName.map((name, index) => {
              return (
                <li data-testid="artist-item" key={index} className="mx-3 text-white">
                  {name}
                </li>
              );
            })}
          </div>
          <p className="mx-3 text-[#ced5e0] text-[14px] mb-[10px]">Тоглолтийн цагийн хуваарь:</p>
          <div className="ml-[15px]">
            <li className="mx-3 text-white">Door open: {data?.getConcert.concertTime}</li>
            <li className="mx-3 text-white mb-[30px]">Music start: 22pm</li>
          </div>
        </div>
        <div className="ml-[15px]">
          <p className="text-white mb-[50px]">Stage plan:</p>
          <img src="/stage.svg" />
        </div>
      </div>
      <div className="flex-1 w-[345px] ml-[50px]">
        <div className="flex flex-col gap-4">
          <div>
            <Select>
              <SelectTrigger className="w-[345px] bg-neutral-800 border-none text-white">
                <SelectValue placeholder={`${formatDate}`} />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 text-white border-none">
                <SelectGroup>
                  <SelectItem className="bg-black" value={data?.getConcert.concertDay}>
                    {formatDate}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
              <div className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9] mx-5"> </div>
              <div className="w-[277px] h-[20px] justify-between flex ">
                <p className="text-[#D9D9D9]">Арын тасалбар ({data?.getConcert.standingAreaTicket?.quantity})</p>
                <p className="text-white ">
                  {new Intl.NumberFormat('mn-MN', {
                    style: 'currency',
                    currency: 'MNT',
                    minimumFractionDigits: 0,
                  })
                    .format(parseFloat(data?.getConcert.standingAreaTicket?.price?.toString() ?? '0'))
                    .replace('MNT', '₮')}
                </p>
              </div>
            </div>
            <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
              <div className="w-[7px] h-[7px] rounded-full bg-[#4651C9] mx-5"> </div>
              <div className="w-[277px] h-[20px] justify-between flex ">
                <p className="text-[#4651C9]">VIP тасалбар ({data?.getConcert.vipTicket?.quantity})</p>
                <p className="text-white">
                  {new Intl.NumberFormat('mn-MN', {
                    style: 'currency',
                    currency: 'MNT',
                    minimumFractionDigits: 0,
                  })
                    .format(parseFloat(data?.getConcert.vipTicket?.price?.toString() ?? '0'))
                    .replace('MNT', '₮')}
                </p>
              </div>
            </div>
            <div className="w-[345px] h-[52px] flex items-center border-dashed border-2 border-[#27272A] mb-3">
              <div className="w-[7px] h-[7px] rounded-full bg-[#C772C4] mx-5"> </div>
              <div className="w-[277px] h-[20px] justify-between flex ">
                <p className="text-[#C772C4]">Энгийн тасалбар ({data?.getConcert.regularTicket?.quantity})</p>
                <p className="text-white">
                  {new Intl.NumberFormat('mn-MN', {
                    style: 'currency',
                    currency: 'MNT',
                    minimumFractionDigits: 0,
                  })
                    .format(parseFloat(data?.getConcert.regularTicket?.price?.toString() ?? '0'))
                    .replace('MNT', '₮')}
                </p>
              </div>
            </div>
          </div>
          <button
            data-testid="info-container-ticket-reservation"
            onClick={ticketReservation}
            className=" w-[345px] h-[36px] bg-[#00B7F4] items-center justify-center hover:bg-[#3279e3] text-[14px] rounded-md my-4"
          >
            Тасалбар захиалах
          </button>
        </div>
      </div>
    </div>
  );
};
export default InfoContainer;
