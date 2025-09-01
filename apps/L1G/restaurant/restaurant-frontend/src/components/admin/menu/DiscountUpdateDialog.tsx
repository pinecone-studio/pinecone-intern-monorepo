'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useUpdateDiscountMutation } from '@/generated';
import { formSchemaDiscount } from '@/helpers/form-schemas';
import { DiscountUpdateProps } from '@/utils/FoodTypes';
import { FormFieldInput } from './FormFieldInput';
import { format } from 'date-fns';

const updateFormDefaults = (discountName: string, discountRate: number, startDate: string, endDate: string) => ({
  discountName: discountName || '',
  discountRate: discountRate || 0,
  discountDate: {
    from: startDate ? new Date(parseInt(startDate)) : undefined,
    to: endDate ? new Date(parseInt(endDate)) : undefined,
  },
});

export const DiscountUpdateDialog = ({ refetch, discountId, discountName, discountRate, startDate, endDate }: DiscountUpdateProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [updateDiscount, { loading }] = useUpdateDiscountMutation();

  const form = useForm<z.infer<typeof formSchemaDiscount>>({
    resolver: zodResolver(formSchemaDiscount),
    defaultValues: updateFormDefaults(discountName, discountRate, startDate, endDate),
  });

  const onSubmit = async (values: z.infer<typeof formSchemaDiscount>) => {
    console.log(values);
    try {
      await updateDiscount({
        variables: {
          discountId: discountId,
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
      toast.success('Хямдрал амжилттай шинэчлэгдлээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хямдрал шинэчлэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="discount-update-dialog-open" variant="secondary" className="flex w-[36px] h-[36px] rounded-md px-4 py-2 bg-[#F4F4F5]">
          <div className="flex justify-center items-center gap-2">
            <Pencil className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="discount-update-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Хямдрал засах
          </DialogTitle>
          <DialogClose data-testid="discount-update-dialog-close">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldInput control={form.control} placeholder="Хямдралын нэр" type="text" fieldName="discountName" data-testid="discount-update-name-input" disabled={false} />
            <FormFieldInput control={form.control} placeholder="Хямдралын хувь" type="number" fieldName="discountRate" data-testid="discount-update-rate-input" disabled={true} />

            <FormField
              control={form.control}
              name="discountDate"
              render={({ field: _field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          data-testid="discount-update-select-date"
                          variant="outline"
                          className="flex w-full items-center justify-center gap-2 font-normal text-sm leading-[20px] text-[#18181B] border solid border-[#E4E4E7]"
                        >
                          <div>
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </div>
                          {startDate && endDate ? (
                            <>
                              {format(new Date(parseInt(startDate)), 'LLL dd, y')} - {format(new Date(parseInt(endDate)), 'LLL dd, y')}
                            </>
                          ) : (
                            <span>Хугацаа сонгох</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button data-testid="discount-update-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit" disabled={loading}>
              {loading ? 'Шинэчилж байна...' : 'Шинэчлэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
