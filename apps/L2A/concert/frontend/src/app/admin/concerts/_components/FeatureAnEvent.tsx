'use client';
import { Button } from '@/components/ui/button';
import { useFeatureAnEventMutation } from '@/generated';
import { Snackbar } from '@mui/material';
import { Star } from 'lucide-react';

const FeatureAnEvent = ({ idx, id }: { idx: number; id: string }) => {
  const [featureAnEvent, { loading, error }] = useFeatureAnEventMutation();
  const handleButton = async (id: string) => {
    await featureAnEvent({ variables: { concertId: id }, refetchQueries: ['concerts'] });
  };
  return (
    <Button onClick={() => handleButton(id)} variant="ghost" size="icon" title="Онцлох" data-testid={`favorite-btn-${idx}`}>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Түр хүлээнэ үү!" />
      <Snackbar autoHideDuration={500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error} message={error?.message} />
      <Star className="h-4 w-4 hover:text-yellow-500" />
    </Button>
  );
};

export default FeatureAnEvent;
