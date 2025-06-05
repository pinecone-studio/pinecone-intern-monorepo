'use client';

import { Button } from '@/components/ui/button';
import { Request, useChangeStatusMutation } from '@/generated';

interface CancelButtonProps {
  request: Request;
}

const CancelButton = ({ request }: CancelButtonProps) => {
  const [changeStatus, { loading, error }] = useChangeStatusMutation();

  const handleChange = async (id: string) => {
    try {
      await changeStatus({
        variables: { requestId: id },
        refetchQueries: ['GetCancelRequests'],
      });
    } catch (err) {
      console.error('Mutation error:', err);
    }
  };

  return (
    <div>
      <Button className="rounded-md" variant="outline" size="sm" onClick={() => handleChange(request.id)} disabled={loading}>
        {loading ? 'Түр хүлээнэ үү...' : 'Дуусгах'}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </div>
  );
};

export default CancelButton;
