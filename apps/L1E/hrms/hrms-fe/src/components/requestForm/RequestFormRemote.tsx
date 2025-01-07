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
import { RequestsInput } from '@/utils/requests-input';
import { Employee, RequestStatus } from '@/generated';
import SuccessModal from './Successmodal';
import { zodResolver } from '@hookform/resolvers/zod';
import requestSchema from '@/utils/request-schema';
interface RequestcomPaidProps {
  employee: Employee;
  leads: Employee[];
  isOpen: boolean;
  onSubmit: (_data: RequestsInput) => Promise<void>;
}
const Requestcomremote = ({ leads, isOpen, employee, onSubmit }: RequestcomPaidProps) => {
  const form = useForm<RequestsInput>({
    resolver: zodResolver(requestSchema),
    defaultValues: { date: new Date(), startTime: '09:00', endTime: '17:00', leadEmployeeId: '', requestStatus: RequestStatus.Remote, reason: '', employeeId: employee._id },
  });
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
