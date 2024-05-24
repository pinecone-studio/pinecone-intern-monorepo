type Details = {
  totalHour: number;
  startDate?: string | null;
};

const RequestDetails = ({ data }: { data: Details }) => {
  const formattedStartDate = data.startDate ? new Date(data.startDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }) : '';

  return (
    <div className="flex flex-col gap-3 w-[565px] h-[312px] bg-white rounded-lg p-5" data-testid="request-details">
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Хугацааны төрөл</p>
      <p className="font-semibold text-black">{data.totalHour}</p>
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Хэдэн өдрөөр тооцон авах</p>
      <p className="font-semibold text-black">{data.totalHour}</p>
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Эхлэх хугацаа</p>
      <p className="font-semibold text-black">{formattedStartDate}</p>
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Дуусах хугацаа</p>
      <p className="font-semibold text-black">{data.totalHour}</p>
    </div>
  );
};

export default RequestDetails;
