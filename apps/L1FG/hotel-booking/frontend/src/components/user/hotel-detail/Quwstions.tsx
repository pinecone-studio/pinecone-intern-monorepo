import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const Quwstions = () => {
  return (
    <div className="w-full flex justify-between gap-[80px]">
      <h4 className="text-2xl font-semibold font-Inter leading-8">Frequently asked questions</h4>
      <div className="w-full max-w-[736px]">
        <Accordion type="single" collapsible className="w-full max-w-[736px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is Flower Hotel Ulaanbaatar pet-friendly?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How much is parking at Flower Hotel Ulaanbaatar?</AccordionTrigger>
            <AccordionContent>Self parking is free at this property.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What time is check-in at Flower Hotel Ulaanbaatar?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles that matches the other components aesthetic.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What time is check-out at Flower Hotel Ulaanbaatar?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles that matches the other components aesthetic.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Does Flower Hotel Ulaanbaatar provide a shuttle to the airport?</AccordionTrigger>
            <AccordionContent>Yes. It comes with default styles that matches the other components aesthetic.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Where is Flower Hotel Ulaanbaatar located?</AccordionTrigger>
            <AccordionContent>Yes. Its animated by default, but you can disable it if you prefer.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
