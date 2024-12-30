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
import { Employee, RequestInput, RequestStatus, useCreateRequestMutation } from '@/generated';
import { useState } from 'react';
import SuccessModal from './Successmodal';
interface RequestcomPaidProps {
  leads: Employee[];
  employee: Employee;
}
const RequestcomPaid = ({ leads, employee }: RequestcomPaidProps) => {
  const form = useForm<RequestsInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { date: new Date(), startTime: '00:00', endTime: '24:00', leadEmployeeId: '', requestStatus: RequestStatus.PaidLeave, reason: '', employeeId: employee._id },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [createRequest] = useCreateRequestMutation();
  const onSubmit = async (data: RequestsInput) => {
    const { date, startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId } = data;
    const newdata: RequestInput = { selectedDay: date.toString().slice(0, 15), startTime, endTime, leadEmployeeId, requestStatus, reason, employeeId };
    await createRequest({ variables: { input: newdata } });
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
            data-testid="date"
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
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar data-testid="calendar-input" mode="single" disabled={(date) => date < new Date()} selected={field.value} onSelect={field.onChange} initialFocus />
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
                    {leads?.map((e, index) => (
                      <SelectItem key={index} data-testid={`Option-${index + 1}`} value={e._id}>
                        {e.username}
                      </SelectItem>
                    ))}
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
                <FormLabel className="text-sm">Цалинтай чөлөө авах шалтгаан*</FormLabel>
                <FormControl data-testid="notes-input">
                  <Textarea placeholder="Шалтгаанаа тайлбарлаж бичнэ үү." className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button data-testid="submit-button" type="submit" className="w-[154px] mt-8 gap-2 bg-slate-900 text-white text-sm font-medium hover:bg-black">
              Хүсэлт илгээх
            </Button>
          </div>
        </form>
      </Form>
      <SuccessModal isOpen={isOpen} />
    </div>
  );
};
export default RequestcomPaid;
