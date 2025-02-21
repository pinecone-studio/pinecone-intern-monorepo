import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';

const SoonWallet = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="relative w-[100px] h-[100px] bg-white rounded-[8px] shadow-sm flex flex-col justify-center items-center gap-1 ">
          <p className="absolute bg-[#ffffffa5] w-full h-full flex justify-center items-center -rotate-[30deg] rounded-full">Тун удахгүй</p>
          <Image src="/Logo.png" alt="wallet-image" width={40} height={40} />
          <div className="text-[#09090B] text-center font-gip text-[14px] font-medium leading-[20px]">Хэтэвч</div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-3/4 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Хэтэвч гэж юу вэ?</AlertDialogTitle>
          <AlertDialogDescription>Таны захиалгын үнийн дүнгээс 3%-ийг хэтэвчинд хадгалан дараагийн худалдан авалтын үнийн дүнгээс хасуулах боломжтой болно.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#441500] text-white px-8">Болсон</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SoonWallet;
