import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const HotelDetailsMock4 = () => {
  return (
    <div className="flex justify-between mt-8">
      <h3 className="font-semibold text-2xl w-[264px]">Frequently asked questions</h3>
      <div className="flex flex-col space-y-4 w-[736px]">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is Flower Hotel Ulaanbaatar pet-friendly?</AccordionTrigger>
            <AccordionContent>Yes. .</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How much is parking at Flower Hotel Ulaanbaatar?</AccordionTrigger>
            <AccordionContent>Self parking is free at this property.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What time is check-in at Flower Hotel Ulaanbaatar?</AccordionTrigger>
            <AccordionContent>anytime.</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Does Flower Hotel Ulaanbaatar provide a shuttle to the airport?</AccordionTrigger>
            <AccordionContent>Yes.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Where is Flower Hotel Ulaanbaatar located?</AccordionTrigger>
            <AccordionContent>UB.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
