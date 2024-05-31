import { PiEyeClosed } from 'react-icons/pi';
import Button from '../CommentsButton';
import { MdDeleteOutline, MdReply } from 'react-icons/md';

type CommentsProps = {
  name?: string;
  email?: string;
  comment?: string;
  createdAt?: string;
  articleId?: string;
};

const CommentsCard = (props: CommentsProps) => {
  const { name, email, comment, createdAt, articleId } = props;

  return (
    <div className="w-[928px] bg-white my-6 rounded-xl">
      <div className="px-6 py-3">
        <div className="text-8 font-bold">{name}</div>
        <div className="flex gap-2">
          <div className="text-3 text-#5E6166">{email}</div>
          <div className="text-3 text-#5E6166">{createdAt}</div>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-5 font-semibold">Post :</h1>
          <h1 className="text-5 text-#5E6166">{articleId}</h1>
        </div>
        <h1 className="text-6 font-bold">{comment}</h1>
      </div>
      <div className="flex justify-between p-6 border-t-2 border-#5E6166">
        <div className="flex gap-3">
          <div className="flex items-center">
            <Button label="Нуухаа болих" icon={PiEyeClosed} btnType="ghost"></Button>
          </div>
          <div className="flex items-center">
            <Button label="Устгах" icon={MdDeleteOutline} btnType="ghost"></Button>
          </div>
        </div>
        <div className="flex items-center">
          <Button label="Хариулах" icon={MdReply} btnType="ghost"></Button>
        </div>
      </div>
    </div>
  );
};
export default CommentsCard;
