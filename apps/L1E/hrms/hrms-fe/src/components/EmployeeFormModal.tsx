'use client';

import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { EmployeeFormValues, employeeSchema } from '@/utils/employee-schema';
import { zodResolver } from '@hookform/resolvers/zod';
interface ConfirmationModalProps {
  openCreate: boolean;
  setOpenCreate: () => void;

  createEmployee: (_data: EmployeeFormValues) => void;
}
export const EmployeeFormModal = ({ openCreate, setOpenCreate, createEmployee }: ConfirmationModalProps) => {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      username: '',
      jobTitle: '',
      email: '',
      employeeStatus: '',
      createdAt: new Date(),
    },
  });

  return (
    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
      <DialogContent data-cy="create-employee-modal" className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Шинэ ажилтан бүртгэх
            <Button data-cy="addEmployee-back-button" variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={setOpenCreate}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>Дараах формыг бөглөж шинэ ажилтны мэдээллийг оруулна уу.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createEmployee)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр, Овог</FormLabel>
                  <FormControl>
                    <Input data-cy="username-input" placeholder="Энд бичих.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Албан тушаал</FormLabel>
                  <FormControl>
                    <Input data-cy="jobtitle-input" placeholder="Энд бичих.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имэйл</FormLabel>
                  <FormControl>
                    <Input data-cy="email-input" placeholder="Энд бичих.." type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ажилд орсон огноо</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button data-testid="calendar-btn" className="w-full pl-3 text-left hover:bg-slate-100 bg-white text-black font-normal">
                          {format(field.value, 'yyyy.MM.dd')}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Эрхийн тохируулах</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-cy="lead-approve-trigger">
                        <SelectValue placeholder="Сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem data-cy="option-lead" value="Lead">
                        Ахлах ажилтан болгох
                      </SelectItem>
                      <SelectItem data-cy="option-employee" value="Employee">
                        Ажилтан болгох
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4 pt-4">
              <Button data-cy="submit-employee-button" type="submit">
                Нэмэх
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
