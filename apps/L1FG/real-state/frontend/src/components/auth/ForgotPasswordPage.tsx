import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().min(4, {
    message: 'Хэрэглэгчийн нэр 4-с дээш байх шаардлагатай.',
  }),
});
type ForgetPasswordProps = {
  onSubmit: (_values: z.infer<typeof FormSchema>) => void;
};

const ForgetPassword = ({ onSubmit }: ForgetPasswordProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  return (
    <div data-cy="Forget-Password-Page" className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <h1 className="text-2xl font-semibold text-center">Нууц үг сэргээх</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Э-мэйл</FormLabel>
                  <FormControl>
                    <Input data-cy="Forget-Password-Page-Email-Input" data-testid="Forget-Password-Page-Email-Input" placeholder="Э-Mэйл" {...field} />
                  </FormControl>
                  <FormMessage data-cy="Forget-Password-Email-Input-Error-Message" />
                </FormItem>
              )}
            />
            <Button data-testid="Forget-Password-Page-Submit-Button" data-cy="Forget-Password-Page-Submit-Button" className="bg-[#F97316] w-full text-center flex justify-center" type="submit">
              Илгээх
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default ForgetPassword;
