type JobLabelProps = {
  title: string;
  labelType?: 'Drafted' | 'Published' | 'Closed';
};

export const JobStatusLabel = ({ title, labelType }: JobLabelProps) => {
  const labels = [
    { status: 'Drafted', bgColor: 'bg-[#fae8a2] text-[#5e4123]' },
    { status: 'Closed', bgColor: 'bg-[#fc9090] text-[#5e2330]' },
    { status: 'Published', bgColor: 'bg-[#c1e6cf] text-[#174224]' },
  ];
  const filterLabels = labels.filter((label) => label.status === labelType);

  return (
    <div>
      <p className={`text-sm tracking-tight py-0.5 px-2 items-center inline-block rounded-xl ${filterLabels[0].bgColor}]`}>{title}</p>
    </div>
  );
};

type ApplicantLabelProps = {
  title: string;
  labelType?: 'Passed' | 'Pending' | 'Rejected' | 'Scheduled' | 'Interview ';
};

export const ApplicantStatusLabel = ({ title, labelType }: ApplicantLabelProps) => {
  const labels = [
    { status: 'Pending', bgColor: 'bg-[#fae8a2] text-[#5e4123]' },
    { status: 'Rejected', bgColor: 'bg-[#fc9090] text-[#5e2330]' },
    { status: 'Passed', bgColor: 'bg-[#c1e6cf] text-[#174224]' },
    { status: 'Interview', bgColor: 'bg-[#a2b5fa] text-[#2a235e]' },
    { status: 'Scheduled', bgColor: 'bg-[#a2b5fa] text-[#2a235e]' },
  ];
  const filterLabels = labels.filter((label) => label.status === labelType);

  return (
    <div>
      <p className={`text-sm tracking-tight py-0.5 px-2 items-center inline-block rounded-xl ${filterLabels[0].bgColor} `}>{title}</p>
    </div>
  );
};
