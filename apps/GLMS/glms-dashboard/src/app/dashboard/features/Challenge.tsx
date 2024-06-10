'use client';
import { useAuth } from '@/common/providers';
import { AllChallenges, Course } from '@/generated';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiTwotoneLike } from 'react-icons/ai';

interface ChallengeCardType extends AllChallenges {
  _id: string;
  courseId: Course;
  onClick: (_id: string) => void;
  actionType: 'Сорил' | 'Устгах' | 'Архив';
}

export const ChallengeCard = (props: ChallengeCardType) => {
  const { access } = useAuth();
  const { courseId, _id, onClick, actionType } = props;

  if (courseId == null) {
    return (
      <div
        data-testid="challenge-card"
        className={`bg-white dark:bg-[#2b2b2b] cursor-pointer w-[281px] overflow-hidden border-solid border-[1px] border-[#0000001A] rounded-xl relative dark:bg-[#3d3d3def]
    `}
        key={_id}
      >
        <div className="w-full h-[160px] object-fill rounded-md overflow-hidden">
          <img data-testid="lessonImage" src={`https://shorturl.at/pjDU0`} alt="lessonImage" />
        </div>
        <div className=" w-full px-[21px] justify-between py-2">
          <p className="text-[16px] font-bold mb-2 text-[#121316] dark:text-[#dedede]" data-testid="titleTest">
            Энэ хичээл устсан
          </p>
          <div className="py-3 flex justify-between items-center">
            <div className="flex w-fit bg-[#FDF4B6]  px-3 py-[2px] rounded-xl  text-[14px] font-normal" data-testid="challenge-badge">
              Challenge
            </div>
            {access == 'багш' && (
              <button className="w-7 h-7" onClick={() => onClick(_id)}>
                <MdOutlineDeleteOutline className="w-6 h-7 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="challenge-card"
      className={`bg-white dark:bg-[#2b2b2b] cursor-pointer w-[281px] overflow-hidden border-solid border-[1px] border-[#0000001A] rounded-xl relative dark:bg-[#3d3d3def]
      `}
      key={_id}
    >
      <div className="w-full h-[120px] object-fill rounded-md overflow-hidden">
        <img data-testid="lessonImage" src={`${courseId?.thumbnail}`} alt="lessonImage" />
      </div>
      <div className=" w-full px-[21px] justify-between py-2">
        <p className="text-[16px] font-bold mb-2 text-[#121316] dark:text-[#dedede]" data-testid="titleTest">
          {courseId?.title}
        </p>
        <p className="text-[14px] font-normal overflow-hidden h-[40px] text-[#3F4145] dark:text-[#dedede]" data-testid="infoTest" color={'#3F4145'}>
          {courseId?.description}
        </p>
        <div className="py-3 flex justify-between items-center">
          <div className="flex w-fit bg-[#FDF4B6]  px-3 py-[2px] rounded-xl  text-[14px] font-normal" data-testid="challenge-badge">
            Challenge
          </div>
          {access == 'багш' && (
            <div>
              <button className="w-7 h-7" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)!.showModal()}>
                {actionType == 'Сорил' ? (
                  <button className="w-7 h-7">
                    <AiTwotoneLike className="w-6 h-7 text-gray-500" />
                  </button>
                ) : (
                  <button className="w-7 h-7">
                    <MdOutlineDeleteOutline className="w-6 h-7 text-gray-500" />
                  </button>
                )}
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-96">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                  </form>
                  <div className="flex justify-center items-center flex-col gap-4">
                    <h3 className="font-bold text-lg text-center">{actionType} руу шилжлүүлэхдээ илтгэлтэй байна уу ?</h3>
                    <div className="flex justify-between w-full">
                      <form method="dialog">
                        <button className="bg-white border rounded-lg font-semibold font-sans px-4 hover:opacity-90 p-1 btn">Болих</button>
                      </form>
                      <form method="dialog">
                        <button
                          className="bg-[#121316] btn border-none text-white font-sans font-semibold rounded-lg  px-4 hover:opacity-90 p-1 "
                          data-testid="challenge-btn"
                          onClick={() => onClick(_id)}
                        >
                          Шилжүүлэх
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
