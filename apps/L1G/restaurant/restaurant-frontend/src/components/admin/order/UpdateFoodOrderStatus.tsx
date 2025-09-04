'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FoodOrderStatus, GetFoodOrdersQuery, useUpdateFoodOrderStatusMutation } from '@/generated';
import { ApolloQueryResult } from '@apollo/client';

const FormSchema = z.object({
  status: z.string(),
});

export const UpdateFoodOrderStatus = ({ orderId, orderStatus, refetch }: { orderId: string; orderStatus: string; refetch: () => Promise<ApolloQueryResult<GetFoodOrdersQuery>> }) => {
  const [updateFoodOrderStatus, { loading }] = useUpdateFoodOrderStatusMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: orderStatus,
    },
  });

  const handleUpdateStatus = async (value: z.infer<typeof FormSchema>) => {
    updateFoodOrderStatus({
      variables: {
        input: {
          orderId: orderId,
          status: value.status as FoodOrderStatus,
        },
      },
    });
    await refetch();
    toast.success('Төлөв амжилттай солигдлоо');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateStatus)} className="flex w-full items-start justify-between" data-testid="update-order-form">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <select
                  {...field}
                  className="h-[36px] w-fit min-w-[142px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="status-trigger"
                >
                  <option value="" disabled>
                    Төлөв
                  </option>
                  <option value="PENDING" data-testid="status-option-pending">
                    PENDING
                  </option>
                  <option value="PREPARING" data-testid="status-option-preparing">
                    PREPARING
                  </option>
                  <option value="READY" data-testid="status-option-ready">
                    READY
                  </option>
                  <option value="DONE" data-testid="status-option-done">
                    DONE
                  </option>
                </select>
              </FormControl>
              <FormMessage data-testid="status-error" />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="bg-[#1D1F24]" data-testid="submit-button">
          {loading ? 'Хадгалж байна...' : ' Хадгалах'}
        </Button>
      </form>
    </Form>
  );
};
