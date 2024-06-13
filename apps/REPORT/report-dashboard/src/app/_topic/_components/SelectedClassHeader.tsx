type SelectedClassItems = {
  text: string;
  day?: string;
};
import { MdOutlineEdit } from 'react-icons/md';
export const SelectedClassHeader = (props: SelectedClassItems) => {
  const { text, day } = props;
  return (
    <div>
      <div className="flex gap-2 ">
        <div className="font-bold font-weight-700 text-2xl">{text}</div>
        <div className="flex justify-center items-center">
          <MdOutlineEdit size={23} />
        </div>
      </div>
      <p>{day}</p>
    </div>
  );
};
