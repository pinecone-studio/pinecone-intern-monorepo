'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { GetDiscountsQuery, useCreateDiscountMutation } from '@/generated';
import { ApolloQueryResult } from '@apollo/client';
import { formSchemaDiscount, initialValuesDiscount } from '@/helpers/form-schemas';
import { FormFieldInput } from './FormFieldInput';

export const DiscountCreateDialog = ({ refetch }: { refetch: () => Promise<ApolloQueryResult<GetDiscountsQuery>> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [createDiscount, { loading }] = useCreateDiscountMutation();

  const form = useForm<z.infer<typeof formSchemaDiscount>>({
    resolver: zodResolver(formSchemaDiscount),
    defaultValues: initialValuesDiscount,
  });

  const onSubmit = async (values: z.infer<typeof formSchemaDiscount>) => {
    try {
      await createDiscount({
        variables: {
          input: {
            discountName: values.discountName,
            discountRate: values.discountRate,
            startDate: values.discountDate.from?.toLocaleString() as string,
            endDate: values.discountDate.to?.toLocaleString() as string,
          },
        },
      });
      await refetch();
      form.reset();
      setIsOpen(false);
      toast.success('Хямдрал амжилттай үүслээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хямдрал үүсгэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          data-testid="discount-create-dialog-open"
          variant="link"
          className="flex w-fit h-[40px] rounded-md px-4 py-2 gap-2 border solid border-[#E4E4E7] bg-[#F4F4F5] text-sm leading-[20px] font-medium text-[#09090B]"
        >
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm leading-[20px] font-medium text-[#09090B]">Хямдрал</p>
            <Plus className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="discount-create-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Хямдрал нэмэх
          </DialogTitle>
          <DialogClose data-testid="discount-create-dialog-close">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldInput control={form.control} placeholder="Хямдралын нэр" type="text" fieldName="discountName" data-testid="discount-create-name-input" />
            <FormFieldInput control={form.control} placeholder="Хямдралын хувь" type="number" fieldName="discountRate" data-testid="discount-create-rate-input" />
            <FormField
              control={form.control}
              name="discountDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          data-testid="discount-create-select-date"
                          variant="outline"
                          className="flex w-full items-center justify-center gap-2 font-normal text-sm leading-[20px] text-[#18181B] border solid border-[#E4E4E7]"
                        >
                          <div>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </div>
                          {field.value.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, 'LLL dd, y')} - {format(field.value.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(field.value.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Хугацаа сонгох</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 flex" align="start">
                      <Calendar
                        data-testid="discount-create-calendar"
                        initialFocus
                        mode="range"
                        numberOfMonths={2}
                        defaultMonth={field.value.from as Date}
                        selected={{
                          from: field.value?.from as Date,
                          to: field.value?.to as Date,
                        }}
                        onSelect={(range) => {
                          field.onChange(range);
                          if (range?.from && range?.to) {
                            setOpen(false);
                          }
                        }}
                        disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button data-testid="discount-create-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit" disabled={loading}>
              {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
