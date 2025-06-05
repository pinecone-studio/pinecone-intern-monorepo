'use client';

import { Button } from '@/components/ui/button';
import { Concert, useFeatureAnEventMutation } from '@/generated';
import { Snackbar, CircularProgress } from '@mui/material';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useState } from 'react';

const FeatureAnEvent = ({ idx, id, row }: { idx: number; id: string; row: Concert }) => {
  const [featureAnEvent, { loading, error }] = useFeatureAnEventMutation();
  const [errorOpen, setErrorOpen] = useState(false);

  const handleButton = async (id: string) => {
    try {
      await featureAnEvent({
        variables: { concertId: id },
        refetchQueries: ['concerts'],
      });
    } catch (e) {
      setErrorOpen(true);
    }
  };

  return (
    <>
      <Button onClick={() => handleButton(id)} variant="ghost" size="icon" title="Онцлох" data-testid={`favorite-btn-${idx}`} disabled={loading}>
        {loading ? (
          <CircularProgress size={18} thickness={5} />
        ) : row.featured ? (
          <FaStar className="text-yellow-500 drop-shadow-sm" />
        ) : (
          <FaRegStar className="text-gray-400 hover:text-yellow-400 transition" />
        )}
      </Button>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={loading} message="Онцолж байна..." autoHideDuration={1200} />
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorOpen} message={error?.message || 'Алдаа гарлаа'} autoHideDuration={3000} onClose={() => setErrorOpen(false)} />
    </>
  );
};

export default FeatureAnEvent;
