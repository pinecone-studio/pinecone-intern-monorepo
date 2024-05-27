import { useState } from 'react';
import { UpdateButton } from '../../../_components';
import { CreateDependent } from './CreateDependent';
import { EmployeeDependentUpdate } from './EmployeeDependentUpdate';
import { Dependent } from '@/generated';

type UpdateDependantProps = {
  dependantPhone: string | null | undefined;
  dependency: string | null | undefined;
  relative: Dependent;
  refetch: () => void;
};

export const UpdateDependent = ({ refetch, dependantPhone, dependency, relative }: UpdateDependantProps) => {
  const [handleCreate, setHandleCreate] = useState(false);
  const [handleUpdate, setHandleUpdate] = useState(false);

  const handleCreateDependent = () => setHandleCreate(true);
  const handleCreateDependentClose = () => setHandleCreate(false);

  const handleUpdateDependent = () => setHandleUpdate(true);
  const handleUpdateDependentClose = () => setHandleUpdate(false);

  return (
    <section data-cy="updateDependent" className="flex flex-col w-full bg-white rounded-xl p-6 gap-6 ">
      <div className="flex justify-between">
        <p className="text-black text-lg font-semibold cursor-pointer">Нэмэлт мэдээлэл</p>
        {dependency ? (
          <>
            <div>
              <div data-cy="dependent-update-button" onClick={() => handleUpdateDependent()}>
                <UpdateButton />
              </div>
              {handleUpdate && (
                <>
                  <div className="flex items-center justify-center max-w-[500px] w-[60%] bg-error rounded-2xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30 overflow-hidden">
                    <EmployeeDependentUpdate refetch={refetch} handleUpdateDependentClose={handleUpdateDependentClose} relative={relative} />
                  </div>
                  <div onClick={() => setHandleUpdate(false)} className="bg-[#00000080] h-full w-full fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
                </>
              )}
            </div>
          </>
        ) : (
          <div>
            <button
              data-testid="add-information"
              className="flex gap-1 py-2 px-3 justify-center items-center bg-[#F6F6F6] rounded-lg text-dark"
              onClick={(e) => {
                e.preventDefault();
                handleCreateDependent();
              }}
            >
              <p className="text-[17px]  mb-[2px]">+</p>
              <p>Нэмэлт мэдээлэл нэмэх</p>
            </button>
            {handleCreate && (
              <>
                <div className="flex items-center justify-center w-[60%] rounded-2xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30 overflow-hidden">
                  <CreateDependent refetch={refetch} handleCreateDependentClose={handleCreateDependentClose} dependantPhone={dependantPhone} dependency={dependency} relative={relative} />
                </div>
                <div
                  onClick={() => {
                    setHandleCreate(false);
                  }}
                  className="bg-[#00000080] h-full w-full fixed z-20 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                ></div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Яаралтай үед холбоо барих хүний дугаар</p>
        <p className="w-full text-left text-main text-base font-semibold">{dependantPhone}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Энэ хүн таны хэн болох</p>
        <p className="w-full text-left text-main text-base font-semibold">{dependency}</p>
      </div>
    </section>
  );
};
