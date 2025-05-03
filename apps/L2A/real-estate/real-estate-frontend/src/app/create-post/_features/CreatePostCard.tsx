import * as React from 'react';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostName } from '../_components/CreatePostName';
import { CreatePostPrice } from '../_components/CreatePostPrice';
import { CreatePostField } from '../_components/CreatePostField';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  price: number;
  field: number;
}
 
export const CreatePostCard = () => {
   const {register, handleSubmit, formState: { errors }, trigger} = useForm<FormValues>();
   const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data", data);
   };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 gap-2">
      <div className="w-full h-screen bg-[#F4F4F5] flex justify-center items-center ">
        <div className="w-[728px] h-[842px] flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center">
          <div className="w-[680px] h-[692px] space-y-4 mt-6">
            <div className="space-y-2">
              <CreatePostHeader />
            </div>
            <CreatePostName />
            <CreatePostPrice />
            <CreatePostField<FormValues> name="field" register={register} error={errors.field} trigger={trigger}/>
            <div className="w-full"></div>
          </div>
        </div>
        <div>
          <button type="submit" className="bg-green-200 p-2 rounded-lg">
            Зар оруулах хүсэлт илгээх
          </button>
        </div>
      </div>
    </form>
  );
};