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
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestsInput } from '@/utils/requests-input';
import requestSchema from '@/utils/request-schema';
import { useState } from 'react';
import { RequestInput, RequestStatus, useCreateRequestMutation } from '@/generated';
import SuccessModal from './Successmodal';

const Requestcomremote = () => {
  const form = useForm<RequestsInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { date: new Date(), startTime: '00:00', endTime: '24:00', leadEmployeeId: '', requestStatus: RequestStatus.Remote, reason: '', employeeId: '676e4cd433fccb9fd4362ef0' },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [createRequest] = useCreateRequestMutation();
  const onSubmit = async (data: RequestsInput) => {
    const { date, startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId } = data;
    const newdata: RequestInput = { selectedDay: date.toString().slice(0, 15), startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId };
    await createRequest({ variables: { input: newdata } });
    console.log(newdata);

    setIsOpen(true);
    setTimeout(() => {
      form.reset();
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y2">
      <Label className="text-sm">Төрөл*</Label>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto pt-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm">Чөлөө авах өдөр*</FormLabel>
                <div className="border rounded-md">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button data-testid="calendar-btn" variant={'outline'} className="w-full pl-3 text-left font-normal">
                          {format(field.value, 'yyyy.MM.dd')}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" disabled={(date) => date < new Date()} selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leadEmployeeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Хэнээр хүсэлтээ батлуулах аа сонгоно уу*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="lead-button">
                      <SelectValue placeholder="Ажилтан сонгох" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem data-testid="Option-1" value="676e4d0d33fccb9fd4362ef2">
                      Option 1
                    </SelectItem>
                    <SelectItem data-testid="Option-2" value="option2">
                      Option 2
                    </SelectItem>
                    <SelectItem data-testid="Option-3" value="option3">
                      Option 3
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Зайнаас ажиллах шалтгаан*</FormLabel>
                <FormControl data-testid="notes-input">
                  <Textarea placeholder="Шалтгаанаа тайлбарлаж бичнэ үү." className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" data-testid="submit-button" className="w-[154px] mt-8 gap-2 bg-slate-900 text-white text-sm font-medium hover:bg-black">
              Хүсэлт илгээх
            </Button>
          </div>
        </form>
      </Form>
      <SuccessModal isOpen={isOpen} />
    </div>
  );
};
export default Requestcomremote;
