type ChallengeDataType = {
  studentEmail?: String | null | undefined;
  challengeId?: string | null | undefined;
  challengeTitle?: String | null | undefined;
  experiencePoint?: Number | null | undefined;
  startedAt?: Date | null | undefined;
  endAt?: Date | null | undefined;
  _typename?: string | null | undefined;
  _id?: string | null | undefined;
};

export const HistoryBar = ({ data }: { data: ChallengeDataType | null }) => {
  const dateString = data?.endAt;
  let date;
  let formattedDate;

  if (dateString) {
    date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    formattedDate = `${year}.${month}.${day}`;
  }
  return (
    <div className="border-[1px] rounded-[12px] items-center px-8 flex justify-between w-[792px] h-[72px]">
      <p className="text-lg font-semibold">{data?.challengeTitle}</p>
      <div className="flex gap-[40px]">
        <p className="text-lg font-bold">Авсан оноо: {data?.experiencePoint !== null && data?.experiencePoint !== undefined ? data.experiencePoint.toString() : 'N/A'}</p>
        <p className="text-lg font-normal text-[#8B8E95]">{formattedDate}</p>
      </div>
    </div>
  );
};
