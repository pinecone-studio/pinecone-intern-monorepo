'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useUpdateCategoryMutation } from '@/generated';
import { CategoryUpdateProps } from '@/utils/food-types';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Категори нэр оруулна уу!',
  }),
});

export const CategoryUpdateDialog = ({ refetch, categoryId, categoryName }: CategoryUpdateProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updateCategory, { loading }] = useUpdateCategoryMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: categoryName || '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await updateCategory({
        variables: {
          categoryId: categoryId,
          input: {
            categoryName: values.categoryName,
          },
        },
      });
      await refetch();
      form.reset();
      setIsOpen(false);
      toast.success('Категори амжилттай шинэчлэгдлээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Категори шинэчлэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button data-testid="cat-update-dialog-open" variant="secondary" className="flex w-[36px] h-[36px] rounded-md px-4 py-2 bg-[#F4F4F5]">
          <div className="flex justify-center items-center gap-2">
            <Pencil className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="cat-update-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Ангилал засах
          </DialogTitle>
          <DialogClose data-testid="cat-update-dialog-close">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input data-testid="cat-update-name-input" placeholder="Ангиллын нэр" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button data-testid="cat-update-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit" disabled={loading}>
              {loading ? 'Шинэчилж байна...' : 'Шинэчлэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
