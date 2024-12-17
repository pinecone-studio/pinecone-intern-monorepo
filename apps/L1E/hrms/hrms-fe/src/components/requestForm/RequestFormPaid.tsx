'use client';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import SuccessModal from './Successmodal';

const requestSchema = z.object({
  dateRange: z.object({
    from: z.date().refine((val) => val !== null, { message: 'огноо сонгох ёстой!' }),
    to: z.date().refine((val) => val !== null, { message: 'огноо сонгох ёстой!' }),
  }),
  lead: z.string().nonempty('сонголт хийгээгүй байна'),
  notes: z.string().min(5, 'хоосон байна'),
});

const RequestcomPaid = () => {
  const form = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
      lead: '',
      notes: '',
    },
  });

  const onSubmit = (data: object) => {
    console.log(data);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y2">
      <Label className="text-sm">Төрөл*</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto pt-6">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm">Цалинтай чөлөө авах өдөр*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'yyyy.MM.dd')} - {format(field.value.to, 'yyyy.MM.dd')}
                            </>
                          ) : (
                            format(field.value.from, 'yyyy.MM.dd')
                          )
                        ) : (
                          <span>Хугацаа сонгох</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar initialFocus mode="range" selected={field.value} onSelect={field.onChange} numberOfMonths={2} disabled={(date) => date < new Date()} />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lead"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Хэнээр хүсэлтээ батлуулах аа сонгоно уу*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ажилтан сонгох" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Цалинтай чөлөө авах шалтгаан*</FormLabel>
                <FormControl>
                  <Textarea placeholder="Шалтгаанаа тайлбарлаж бичнэ үү." className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-[154px] mt-8 gap-2 bg-slate-900 text-white text-sm font-medium hover:bg-black">
              Хүсэлт илгээх
            </Button>
          </div>
        </form>
      </Form>
      <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
export default RequestcomPaid;
