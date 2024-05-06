type DetailData = {
  _id?: string | null;
  declinedReasoning?: string | null;
};

const DetailInfo = ({ data }: { data: DetailData }) => (
  <div className="flex flex-col gap-3 w-[565px] h-[168px] bg-white rounded-lg p-5">
    <div>
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Нэр</p>
      <p style={{ fontWeight: 600, color: 'rgba(18, 19, 22, 1)' }}>{data._id}</p>
    </div>
    <div>
      <p style={{ color: 'rgba(63, 65, 69, 1)' }}>Шалтгаан</p>
      <p style={{ fontWeight: 600, color: 'rgba(18, 19, 22, 1)' }}>{data.declinedReasoning}</p>
    </div>
  </div>
);

export default DetailInfo;
