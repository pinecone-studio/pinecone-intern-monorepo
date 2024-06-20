import { PiStudentLight } from 'react-icons/pi';
type SelectedClassItems = {
  text: string;
  students?: number;
};

export const SelectedClassHeader = (props: SelectedClassItems) => {
  const { text, students } = props;
  return (
    <div>
      <div className="flex gap-2 ">
        <div className="font-bold font-weight-700 text-2xl">{text}</div>
      </div>
      <div className="flex">
        <PiStudentLight size={20} />
        <p>Нийт:{students}</p>
      </div>
    </div>
  );
};
