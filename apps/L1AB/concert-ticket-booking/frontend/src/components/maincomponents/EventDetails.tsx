import { useGetEventByIdQuery } from '@/generated';

interface EventDetailsProps {
  id: string;
}
export const EventDetails = ({ id }: EventDetailsProps) => {
  const { data } = useGetEventByIdQuery({ variables: { id } });
  console.log(data?.getEventById.artistName);

  return (
    <div>
      <div className="text-whtie">{data?.getEventById?.artistName}</div>
    </div>
  );
};
