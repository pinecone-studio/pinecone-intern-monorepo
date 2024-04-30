type JobLabelProps = {
  title: string;
  labelType?: 'Drafted' | 'Published' | 'Closed';
};

export const JobStatusLabel = ({ title, labelType }: JobLabelProps) => {
  const labels = [
    { status: 'Drafted', bgColor: '#fae8a2', color: '#5e4123' },
    { status: 'Closed', bgColor: '#fc9090', color: '#5e2330' },
    { status: 'Published', bgColor: '#c1e6cf', color: '#174224' },
  ];
  const filterLabels = labels.filter((label) => label.status === labelType);

  return (
    <div>
      <p className={`p-1 m-1 inline-block rounded-md bg-[${filterLabels[0]?.bgColor} text-[${filterLabels[0]?.color}]`}>{title}</p>
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
      <p className={`px-2 py-1 m-1 inline-block rounded-md ${filterLabels[0].bgColor} `}>{title}</p>
    </div>
  );
};
