'use client';
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
import requestSchema from './RequestSchema';
const RequestcomTime1 = () => {
  const form = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      date: new Date(),
      startTime: '08:00',
      endTime: '09:00',
      lead: '',
      notes: '',
    },
  });
  return (
    <div className="space-y2 flex ">
      <Form {...form}>
        <form data-testid="form" className="space-y-6 w-full mx-auto pt-6">
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
                        <Button variant={'outline'} className="w-full pl-3 text-left font-normal">
                          {format(field.value, 'yyyy.MM.dd')}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar data-testid="calendar-input" mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="startTime"
              data-testid="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Эхлэх цаг*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={`${String(i).padStart(2, '0')}:00`}>
                          {`${String(i).padStart(2, '0')}:00`}
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
              name="endTime"
              data-testid="endtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Дуусах цаг*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={`${String(i).padStart(2, '0')}:00`}>
                          {`${String(i).padStart(2, '0')}:00`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="lead"
            data-testid="lead-button"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Хэнээр хүсэлтээ батлуулах аа сонгоно уу*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ажилтан сонгох" className="custom-select" />
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
            data-testid="notes-input"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Чөлөө авах шалтгаан*</FormLabel>
                <FormControl>
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
    </div>
  );
};
export default RequestcomTime1;
