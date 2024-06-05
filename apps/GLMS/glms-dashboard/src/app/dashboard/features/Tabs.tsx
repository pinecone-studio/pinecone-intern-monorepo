import { ChallengeType } from '../page';
import { EmptyIcon } from '../../../../public/assets/EmptyIcon';
import { ChallengeCard } from './Challenge';

type TabsType = {
  lessonData: ChallengeType[];
  onClick: (_id: string) => void;
  actionType: 'Сорил' | 'Устгах' | 'Архив';
};

export const Tabs = (props: TabsType) => {
  const { lessonData = [], onClick, actionType } = props;

  if (lessonData.length == 0) {
    return (
      <div className="m-auto mt-[5%] flex justify-center">
        <EmptyIcon />
      </div>
    );
  }

  return (
    <div>
      <div className="w-full min-h-screen dark:bg-[#121316f7]">
        <div className=" mr-auto ml-auto  flex w-[85%] max-w-[1440px] m-auto">
          <div className=" flex flex-wrap box-border  h-full w-full">
            {lessonData?.map((data: ChallengeType, index: number) => {
              return (
                <div className="relative" key={index}>
                  <div>
                    <div data-cy="courseClick" className="mt-8 mr-8 " key={data.id}>
                      <ChallengeCard _id={data._id} courseId={data.courseId} onClick={onClick} actionType={actionType} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
