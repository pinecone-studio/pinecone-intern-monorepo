'use client';

import { Container, SearchDatePicker, SearchSelectGuest } from './assets';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMain } from '../providers/MainProvider';

export const Search = () => {
  const { setDateRange, setTraveler } = useMain();
  const router = useRouter();

  const searchForm = useFormik({
    initialValues: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      guests: 1,
    },
    onSubmit: (values) => {
      setDateRange({
        checkIn: values.startDate,
        checkOut: values.endDate,
      });
      setTraveler(values.guests);

      localStorage.setItem(
        'dateNtraveler',
        JSON.stringify({
          startDate: values.startDate,  
          endDate: values.endDate,
          traveler: values.guests,
        })
      );

      router.push('/hotels');
    },
  });

  return (
    <>
      <Container backgroundColor="bg-backBlue">
        <form onSubmit={searchForm.handleSubmit} className="relative h-24">
          <div className="absolute top-10 bg-white w-[1160px] left-[60px] flex justify-between items-end gap-4 p-4 rounded-md border-[3px] border-[#FFB700]">
            <div className="w-full flex gap-4">
              <div className="space-y-1 flex-1">
                <p className="text-sm">Dates</p>
                <SearchDatePicker
                  startDate={searchForm.values.startDate}
                  endDate={searchForm.values.endDate}
                  onChange={(startDate, endDate) => {
                    searchForm.setFieldValue('startDate', startDate);
                    searchForm.setFieldValue('endDate', endDate);
                  }}
                />
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm">Guest</p>
                <SearchSelectGuest value={searchForm.values.guests} onChange={(guests) => searchForm.setFieldValue('guests', guests)} />
              </div>
            </div>
            <Button data-testid="search" type="submit" className="bg-blue-600">
              Search
            </Button>
          </div>
        </form>
      </Container>
      <Container backgroundColor="bg-white h-12"></Container>
    </>
  );
};
