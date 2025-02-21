import { HotelDetailMainProps } from '@/components/user/hotel-detail/HotelDetailMain';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const Questions = ({ data }: HotelDetailMainProps) => {
  console.log(data)
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6 gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Frequently asked questions</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="w-full max-w-[736px]">
        <Accordion type="single" collapsible className="w-full max-w-[736px]">
          {data?.faqs?.map((faq) => (
            <AccordionItem key={faq?.key} value="1">
              <AccordionTrigger>{faq?.key}</AccordionTrigger>
              <AccordionContent>
                {faq?.value}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
