import { Plus } from 'lucide-react';
import StoryHighlightModal from './StoryHighlightModal';
import { useGetUserTogetherQuery } from '@/generated';

const StoryHighlight = ({ userId }: { userId: string }) => {
  const { data } = useGetUserTogetherQuery({
    variables: { searchingUserId: userId },
  });
  const isOwnerId = data?.getUserTogether?.viewer?._id === userId;

  return (
    <div>
      {isOwnerId ? (
        <div className="p-8 ">
          <div className="flex flex-col gap-4">
            <StoryHighlightModal>
              <p className="rounded-full border h-20 w-20 flex justify-center items-center cursor-pointer">
                <a className=" rounded-full h-[70px] w-[70px] flex justify-center items-center bg-gray-100 ">
                  <Plus className="h-10 w-10  " color="white  " />
                </a>
              </p>
            </StoryHighlightModal>
            <p className="ml-6">New</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default StoryHighlight;
