type Details = {
  description: string;
};
const RequestDetails = ({ data }: { data: Details }) => (
  <div className="flex flex-col gap-3 w-[565px] h-[312px] bg-white rounded-sm p-5" data-testid="request-details">
    <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Хугацааны төрөл</p>
    <p className="font-semibold text-black">{data.description}</p>
    <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Хэдэн өдрөөр тооцон авах</p>
    <p className="font-semibold text-black">{data.description}</p>
    <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Эхлэх хугацаа</p>
    <p className="font-semibold text-black">{data.description}</p>
    <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Дуусах хугацаа</p>
    <p className="font-semibold text-black">{data.description}</p>
  </div>
);
export default RequestDetails;
