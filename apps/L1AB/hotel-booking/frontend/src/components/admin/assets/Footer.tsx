import { CircleIcon } from '@/components/icon/CircleIcon';
import { PediaIcon } from '@/components/icon/PediaIcon';
import { Copyright } from 'lucide-react';

export const Footer = () => {
    return (
        <div data-testid="footer" className='py-8 border-y flex items-center justify-between px-4'>
            <div className='flex gap-[6.7px] items-center'>
                <CircleIcon/>
                <PediaIcon/>
            </div>
            <div className='flex text-[#71717A] items-center gap-1 text-sm'>
                <Copyright className='size-4'/>
                <p>Copyright 2024</p>
            </div>
        </div>
    )
}
