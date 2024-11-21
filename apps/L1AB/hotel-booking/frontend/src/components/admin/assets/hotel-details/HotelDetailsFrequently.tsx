import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const HotelDetailsFrequently = () => {
  return (
    <div>
      <h1 className="font-semibold text-lg mb-2">Frequently asked questions</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is Flower Hotel Ulaanbaatar pet-friendly?</AccordionTrigger>
          <AccordionContent>Yes. </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How much is parking at Flower Hotel Ulaanbaatar?</AccordionTrigger>
          <AccordionContent>Self parking is free at this property. .</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What time is check-in at Flower Hotel Ulaanbaatar?</AccordionTrigger>
          <AccordionContent>anytime .</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Does Flower Hotel Ulaanbaatar provide a shuttle to the airport?</AccordionTrigger>
          <AccordionContent>Yeah .</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Where is Flower Hotel Ulaanbaatar located?</AccordionTrigger>
          <AccordionContent>in Ulaanbatar of course.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
