'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ReactElement, useState } from 'react';
import Image from 'next/image';
import { formSchemaFood } from '@/utils/form-schemas';
import { SelectCategoryInput } from '@/components/admin';

export const EditDialog = ({ title, submitText, children, onSubmit }: { title: string; submitText: string; children: ReactElement; onSubmit: (values: z.infer<typeof formSchemaFood>) => void }) => {
  const [image, setImage] = useState<string>('');
  const methods = useForm();
  const form = useForm<z.infer<typeof formSchemaFood>>({
    resolver: zodResolver(formSchemaFood),
    defaultValues: {
      foodName: '',
      price: '',
      category: '',
      status: 'Идэвхитэй',
    },
  });
  const handleDeleteImage = () => {
    setImage('');
  };
  const fileRef = form.register('image');

  return (
    <FormProvider {...methods}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="flex w-[89px] h-[40px] rounded-md px-4 py-2 gap-2 border solid border-[#E4E4E7] bg-[#FFFFFF] text-sm leading-[20px] font-medium text-[#09090B]">
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex w-full justify-between items-center">
            <DialogTitle className="flex justify-start text-[18px] leading-[18px] font-semibold text-[#09090B]">{title}</DialogTitle>
            <DialogClose>
              <X className="w-4 h-4" />
            </DialogClose>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="foodName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input data-testid="food-dialog-foodname" placeholder="Хоолны нэр" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex justify-center items-center">
                        <FormItem>
                          <div className="flex justify-center items-center gap-3">
                            <FormControl>
                              <RadioGroupItem data-testid="edit-dialog-activestatus" value="Идэвхитэй" />
                            </FormControl>
                            <FormLabel className="font-normal">Идэвхитэй</FormLabel>
                          </div>
                        </FormItem>
                        <FormItem>
                          <div className="flex justify-center items-center gap-3">
                            <FormControl>
                              <RadioGroupItem data-testid="edit-dialog-inactivestatus" value="Идэвхигүй" />
                            </FormControl>
                            <FormLabel className="font-normal">Идэвхигүй</FormLabel>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <Button variant="ghost" className={`flex w-full h-[52px] rounded-md p-4 has-[>svg]:px-0 bg-[#F4F4F5] border solid border-[#E4E4E7] ${image && 'w-full h-[150px] p-0'}`}>
                      <div className={`flex justify-center items-center gap-2 ${image && 'absolute z-0'} `}>
                        <Plus className="flex w-4 h-4" />
                        <p className="text-sm leading-[20px] text-[#202223]">Зураг нэмэх</p>
                      </div>

                      <FormControl>
                        <Input
                          data-testid="edit-dialog-image"
                          className="flex absolute opacity-0"
                          type="file"
                          {...fileRef}
                          onChange={(event) => {
                            if (!event.target.files) return;
                            field.onChange(event.target?.files?.[0] ?? undefined);
                            setImage(URL.createObjectURL(event.target.files[0]));
                          }}
                        />
                      </FormControl>
                      {image && (
                        <div className="flex relative w-full h-[150px] justify-center items-center rounded-md">
                          <Image fill={true} src={image} alt="image" id="image" className="w-[300px] h-[300px] rounded-md" />
                          <div
                            onClick={handleDeleteImage}
                            className="flex w-[36px] h-[36px] px-4 py-2 absolute right-[10px] top-[10px] justify-center items-center border solid border-[#E4E4E7] bg-[#FFF] rounded-full"
                          >
                            <X className="flex w-4 h-4 stroke-[#18181B] fill-[#18181B] absolute" />
                          </div>
                        </div>
                      )}
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <SelectCategoryInput onChange={field.onChange} defaultValue={field.value} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input data-testid="edit-dialog-price" placeholder="Үнэ" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24] " type="submit">
                {submitText}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
