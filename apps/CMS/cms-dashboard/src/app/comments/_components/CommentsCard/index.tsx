import { PiEyeClosed } from "react-icons/pi";
import Button from "../CommentsButton";
import { MdDeleteOutline, MdReply } from "react-icons/md";
 
type CommentsProps = {
  name?: string;
  email?: string;
  comment?: string;
  createdAt?: string;
  articleId?: string;
  isHidden: boolean;
  isHiddenDeleted:boolean;
};
 
const Index = (props: CommentsProps) => {
 
  const { name, email, comment, createdAt, articleId,isHidden,isHiddenDeleted} = props;
 
 
  return (
    <div className='w-[928px] bg-white my-6 rounded-xl'>
      <div className='px-6 py-3'>
        <div className='text-8 font-bold'>
          {name}
        </div>
        <div className='flex gap-2'>
          <div className='text-3 text-gray'>
            {email}
          </div>
          <div className='text-3 text-gray'>
            {createdAt}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <h1 className='text-5 font-semibold'>
            Post:
          </h1>
          <h1 className='text-5 text-gray'>
            {articleId}
          </h1>
        </div>
        <h1 className='text-6 font-bold'>
          {comment}
        </h1>
      </div>
      <div className='flex flex-col p-6 border-t-2 border-gray'>
        {!isHidden && (
          <div className="flex justify-between">
            <div className='flex gap-3'>
              <div className='flex items-center'>
                <Button label="Нуухаа болих" icon={PiEyeClosed} btnType='ghost' />
              </div>
              <div className='flex items-center'>
                <Button label="Устгах" icon={MdDeleteOutline} btnType='ghost' />
              </div>
            </div>
            <div className='flex items-center'>
              <Button label="Хариулах" icon={MdReply} btnType='ghost' />
            </div>
          </div>
        )}
        {!isHiddenDeleted && (
          <div className="flex justify-center items-center">
            <div className='flex items-center'>
              <Button label="Буцаах" icon={MdDeleteOutline} btnType='ghost' />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Index;