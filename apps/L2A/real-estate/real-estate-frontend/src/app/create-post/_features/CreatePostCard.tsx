import * as React from 'react';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostName } from '../_components/CreatePostName';
 
export const CreatePostCard = () => {
  return (
    <div className='w-full h-screen bg-[#F4F4F5] flex justify-center items-center '>
      <div className='w-[728px] h-[842px] flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center'>
        <div className='w-[680px] h-[692px] space-y-4 mt-6'>
        <div className='space-y-2'>
      <CreatePostHeader/>
        </div>
        <form className='space-y-4 gap-2'>
          <div>
            <CreatePostName/>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div className='w-full'>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};