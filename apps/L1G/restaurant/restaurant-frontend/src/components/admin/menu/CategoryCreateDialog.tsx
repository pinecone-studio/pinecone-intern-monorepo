'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { GetCategoriesQuery, useCreateCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import { ApolloQueryResult } from '@apollo/client';

const formSchema = z.object({
  categoryName: z.string().min(2, {
    message: 'Категори нэр оруулна уу!',
  }),
});

export const CategoryCreateDialog = ({ refetch }: { refetch: () => Promise<ApolloQueryResult<GetCategoriesQuery>> }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [createCategory, { loading }] = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createCategory({
        variables: {
          input: {
            categoryName: values.categoryName,
          },
        },
      });
      await refetch();
      form.reset();
      setIsOpen(false);
      toast.success('Категори амжилттай үүслээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Категори үүсгэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          data-testid="cat-create-dialog-open"
          variant="link"
          className="flex w-[89px] h-[40px] rounded-md px-4 py-2 gap-2 border solid border-[#E4E4E7] bg-[#FFFFFF] text-sm leading-[20px] font-medium text-[#09090B]"
        >
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm leading-[20px] font-medium text-[#09090B]">Цэс</p>
            <Plus className="w-4 h-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-between items-center">
          <DialogTitle data-testid="cat-create-dialog-title" className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">
            Ангилал нэмэх
          </DialogTitle>
          <DialogClose data-testid="cat-create-dialog-close">
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
                    <Input data-testid="cat-create-name-input" type="text" placeholder="Ангиллын нэр" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button data-testid="cat-create-submit-button" className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit" disabled={loading}>
              {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
